from fastapi import APIRouter
from app.services.investment_service import fund_loan

router = APIRouter()

@router.post("/fund-loan")
def fund(investor_id: int, loan_id: int, amount: float):
    try:
        fund_loan(investor_id, loan_id, amount)
        return {"status": "success"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
