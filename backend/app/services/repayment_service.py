from app.utils.transaction import Transaction
from app.models.repayment import create_repayment
from app.models.investment import get_investments_by_loan
from app.models.account import get_account_by_user_id, update_balance
from app.models.ledger import add_ledger_entry

def process_repayment(loan_id, amount):
    with Transaction() as cur:

        # 1. Record repayment
        repayment_id = create_repayment(cur, loan_id, amount)

        # 2. Get all investors
        investments = get_investments_by_loan(cur, loan_id)

        if not investments:
            raise Exception("No investors found")

        total_distributed = 0
        distributions = []

        # 3. Calculate each share
        for investor_id, invested_amt, ratio in investments:
            share = round(amount * ratio, 2)
            distributions.append((investor_id, share))
            total_distributed += share

        # 4. Fix rounding issue
        difference = round(amount - total_distributed, 2)

        if difference != 0:
            # adjust last investor
            investor_id, share = distributions[-1]
            distributions[-1] = (investor_id, share + difference)

        # 5. Distribute money
        for investor_id, share in distributions:

            account = get_account_by_user_id(cur, investor_id)
            if not account:
                raise Exception("Account not found")

            account_id = account[0]

            # Credit investor
            update_balance(cur, account_id, share)

            # Ledger entry
            add_ledger_entry(
                cur,
                account_id,
                share,
                "repayment_credit",
                repayment_id
            )

        print("Repayment distributed successfully")