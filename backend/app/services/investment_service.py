from backend.app.utils.transaction import Transaction
from backend.app.models.account import get_account_by_user, update_balance
from backend.app.models.investment import create_investment
from backend.app.models.loan import get_loan, update_funded_amount
from backend.app.models.ledger import add_ledger_entry

def fund_loan(investor_id, loan_id, amount):
    with Transaction() as cur:

        # 1. Get investor account
        account = get_account_by_user(cur, investor_id)
        if not account:
            raise Exception("Account not found")

        account_id, balance = account

        if balance < amount:
            raise Exception("Insufficient balance")

        # 2. Get loan details
        loan = get_loan(cur, loan_id)
        if not loan:
            raise Exception("Loan not found")

        total_amount, funded_amount = loan

        remaining = total_amount - funded_amount
        if amount > remaining:
            raise Exception("Overfunding not allowed")

        # 3. Deduct balance
        update_balance(cur, account_id, -amount)

        # 4. Calculate ownership
        ratio = amount / total_amount

        # 5. Create investment
        create_investment(cur, loan_id, investor_id, amount, ratio)

        # 6. Update loan funded amount
        update_funded_amount(cur, loan_id, amount)

        # 7. Ledger entry
        add_ledger_entry(cur, account_id, -amount, "loan_funding", loan_id)

        print("Loan funded successfully")