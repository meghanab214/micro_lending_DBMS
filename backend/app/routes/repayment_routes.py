from fastapi import APIRouter
from services.repayment_service import process_repayment

router = APIRouter()

@router.post("/repay")
def repay(loan_id: int, amount: float):
    try:
        process_repayment(loan_id, amount)
        return {"status": "success"}
    except Exception as e:
        return {"status": "error", "message": str(e)}