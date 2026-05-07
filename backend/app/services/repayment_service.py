from datetime import datetime
from app.utils.transaction import Transaction
from app.models.repayment import create_repayment
from app.models.investment import get_investments_by_loan
from app.models.account import get_account_by_user_id, update_balance
from app.models.ledger import add_ledger_entry
from decimal import Decimal
from app.services.redis_queue_service import add_default_check_job


def process_repayment(loan_id, amount):
    with Transaction() as cur:
        amount = Decimal(str(amount))

        # 1. Get EMI
        emi = get_next_emi(cur, loan_id)

        if not emi:
            raise Exception("Loan already completed")

        emi_id, principal_due, interest_due, total_due, due_date, penalty_applied = emi

        # 2. Check late + penalty
        is_late = datetime.now() > due_date

        penalty = 0
        if is_late and not penalty_applied:
            penalty = apply_penalty(cur, emi_id, loan_id, total_due)

        # 3. Validate amount
        expected_amount = round(total_due + penalty, 2)

        if round(amount, 2) != expected_amount:
            raise Exception(f"Expected {expected_amount}, got {amount}")

        # 4. Record repayment
        repayment_id = create_repayment(cur, loan_id, amount)

        # 5. Get investors
        investments = get_investments_by_loan(cur, loan_id)

        if not investments:
            raise Exception("No investors found")

        total_distributed = 0
        distributions = []

        # 6. Calculate shares
        for investor_id, invested_amt, ratio in investments:

            interest_share = round(interest_due * ratio, 2)
            principal_share = round(principal_due * ratio, 2)
            penalty_share = round(penalty * ratio, 2)

            total_share = round(
                interest_share + principal_share + penalty_share, 2
            )

            distributions.append((investor_id, total_share))
            total_distributed += total_share

        # 7. Fix rounding difference
        difference = round(amount - total_distributed, 2)

        if difference != 0:
            investor_id, share = distributions[-1]
            distributions[-1] = (investor_id, round(share + difference, 2))

        # 8. Distribute funds
        for investor_id, share in distributions:

            account = get_account_by_user_id(cur, investor_id)
            if not account:
                raise Exception("Account not found")

            account_id = account[0]

            update_balance(cur, account_id, share)

            add_ledger_entry(
                cur,
                account_id,
                share,
                "repayment_credit",
                repayment_id
            )

        # 9. Mark EMI as paid
        cur.execute("""
            UPDATE emi_schedule
            SET status = 'paid',
                paid_date = NOW()
            WHERE id = %s
        """, (emi_id,))

        print("Repayment distributed successfully")

        
    add_default_check_job(loan_id)

# 🔹 Get next unpaid EMI
def get_next_emi(cur, loan_id):
    cur.execute("""
        SELECT id, principal_due, interest_due, total_due, due_date, penalty_applied
        FROM emi_schedule
        WHERE loan_id = %s AND status = 'pending'
        ORDER BY installment_number
        LIMIT 1
    """, (loan_id,))

    return cur.fetchone()


# 🔹 Apply penalty
def apply_penalty(cur, emi_id, loan_id, amount):
    penalty = round(amount * 0.02, 2)

    cur.execute("""
        UPDATE emi_schedule
        SET penalty_applied = TRUE
        WHERE id = %s
    """, (emi_id,))

    return penalty