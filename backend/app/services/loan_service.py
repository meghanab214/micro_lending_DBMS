from app.utils.transaction import Transaction
from app.services.credit_service import evaluate_loan
from app.services.kyc_service import check_kyc
from datetime import datetime, timedelta


def create_loan(borrower_id, amount, interest_rate, term_months, business_id=None):
    with Transaction() as cur:

        # 1. Check KYC
        check_kyc(cur, borrower_id)

        # 2. Create loan first
        cur.execute("""
            INSERT INTO loans (borrower_id, amount, interest_rate, term_months)
            VALUES (%s, %s, %s, %s)
            RETURNING id
        """, (borrower_id, amount, interest_rate, term_months))

        loan_id = cur.fetchone()[0]

        # 3. Evaluate credit score when business data is available.
        if business_id is not None:
            evaluate_loan(cur, loan_id, business_id)
        else:
            cur.execute("UPDATE loans SET credit_score = %s WHERE id = %s", (0, loan_id))

        # 4. Create EMI schedule
        monthly_rate = interest_rate / 100 / 12
        num_payments = term_months
        
        # EMI calculation: EMI = P * (r * (1+r)^n) / ((1+r)^n - 1)
        if monthly_rate > 0:
            emi_amount = amount * (monthly_rate * (1 + monthly_rate)**num_payments) / ((1 + monthly_rate)**num_payments - 1)
        else:
            emi_amount = amount / num_payments
        
        start_date = datetime.now().date()
        remaining_principal = amount
        
        for i in range(1, num_payments + 1):
            due_date = start_date + timedelta(days=30*i)
            interest_due = remaining_principal * monthly_rate
            principal_due = emi_amount - interest_due
            total_due = principal_due + interest_due
            
            cur.execute("""
                INSERT INTO emi_schedule (loan_id, installment_number, due_date, principal_due, interest_due, total_due, status)
                VALUES (%s, %s, %s, %s, %s, %s, 'pending')
            """, (loan_id, i, due_date, principal_due, interest_due, total_due))
            
            remaining_principal -= principal_due

        print("Loan created + credit evaluated + EMI schedule generated")

        return loan_id