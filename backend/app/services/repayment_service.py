from app.utils.transaction import Transaction
from app.models.repayment import create_repayment
from app.models.investment import get_investments_by_loan
from app.models.account import get_account_by_user_id, update_balance
from app.models.ledger import add_ledger_entry

def process_repayment(loan_id, amount):
    with Transaction() as cur:

        # 1. Get EMI
        emi = get_next_emi(cur, loan_id)

        if not emi:
            raise Exception("Loan already completed")

        emi_id, principal_due, interest_due, total_due = emi

        if round(amount, 2) != round(total_due, 2):
            raise Exception("Incorrect EMI amount")

        # 2. Record repayment (FIXED)
        repayment_id = create_repayment(cur, loan_id, amount)

        # 3. Get investors
        investments = get_investments_by_loan(cur, loan_id)

        if not investments:
            raise Exception("No investors found")

        total_distributed = 0
        distributions = []

        # 4. Calculate shares (FIXED)
        for investor_id, invested_amt, ratio in investments:

            interest_share = round(interest_due * ratio, 2)
            principal_share = round(principal_due * ratio, 2)

            total_share = round(interest_share + principal_share, 2)

            distributions.append((investor_id, total_share))
            total_distributed += total_share

        # 5. Fix rounding
        difference = round(amount - total_distributed, 2)

        if difference != 0:
            investor_id, share = distributions[-1]
            distributions[-1] = (investor_id, share + difference)

        # 6. Distribute
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

        # 7. Mark EMI paid (MOVED OUTSIDE LOOP)
        cur.execute("""
            UPDATE emi_schedule
            SET status = 'paid'
            WHERE id = %s
        """, (emi_id,))

        print("Repayment distributed successfully")

def get_next_emi(cur, loan_id):
    cur.execute("""
        SELECT id, principal_due, interest_due, total_due
        FROM emi_schedule
        WHERE loan_id = %s AND status = 'pending'
        ORDER BY installment_number
        LIMIT 1
    """, (loan_id,))
    
    return cur.fetchone()