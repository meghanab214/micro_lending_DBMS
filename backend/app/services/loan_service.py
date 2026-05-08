from app.utils.transaction import Transaction
from app.services.credit_service import evaluate_loan
from app.services.kyc_service import check_kyc


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

        print("Loan created + credit evaluated")

        return loan_id