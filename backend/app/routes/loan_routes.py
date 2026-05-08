from fastapi import APIRouter
from app.services.loan_service import create_loan
from app.utils.transaction import Transaction

router = APIRouter()

@router.post("/create-loan")
def create(borrower_id: int, amount: float, interest_rate: float, term_months: int, business_id: int = None):
    try:
        loan_id = create_loan(borrower_id, amount, interest_rate, term_months, business_id)
        return {"status": "success", "loan_id": loan_id}
    except Exception as e:
        return {"status": "error", "message": str(e)}
        
@router.get("/loans")
def list_loans():
    with Transaction() as cur:
        cur.execute(
            """
            SELECT id, borrower_id, amount, funded_amount, interest_rate, term_months, status, credit_score
            FROM loans
            """
        )
        rows = cur.fetchall()
        loans = [
            {
                "id": r[0],
                "borrower_id": r[1],
                "amount": float(r[2]) if r[2] is not None else None,
                "funded_amount": float(r[3]) if r[3] is not None else None,
                "interest_rate": float(r[4]) if r[4] is not None else None,
                "term_months": r[5],
                "status": r[6],
                "credit_score": float(r[7]) if r[7] is not None else None,
            }
            for r in rows
        ]
        return {"status": "success", "data": loans}

@router.get("/loans/{loan_id}")
def get_loan_details(loan_id: int):
    with Transaction() as cur:
        cur.execute(
            """
            SELECT id, borrower_id, amount, funded_amount, interest_rate, term_months, status, credit_score
            FROM loans WHERE id = %s
            """,
            (loan_id,)
        )
        r = cur.fetchone()
        if not r:
            return {"status": "error", "message": "Loan not found"}

        loan = {
            "id": r[0],
            "borrower_id": r[1],
            "amount": float(r[2]) if r[2] is not None else None,
            "funded_amount": float(r[3]) if r[3] is not None else None,
            "interest_rate": float(r[4]) if r[4] is not None else None,
            "term_months": r[5],
            "status": r[6],
            "credit_score": float(r[7]) if r[7] is not None else None,
        }
        return {"status": "success", "data": loan}