from fastapi import APIRouter
from app.services.loan_service import create_loan

router = APIRouter()

@router.post("/create-loan")
def create(borrower_id: int, amount: float, interest_rate: float, term_months: int, business_id: int):
    try:
        loan_id = create_loan(borrower_id, amount, interest_rate, term_months, business_id)
        return {"status": "success", "loan_id": loan_id}
    except Exception as e:
        return {"status": "error", "message": str(e)}