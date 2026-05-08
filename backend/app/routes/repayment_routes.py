from fastapi import APIRouter
from app.services.repayment_service import process_repayment
from app.utils.transaction import Transaction

router = APIRouter()

@router.post("/repay")
def repay(loan_id: int, amount: float):
    try:
        process_repayment(loan_id, amount)
        return {"status": "success"}
    except Exception as e:
        return {"status": "error", "message": str(e)}


@router.get("/emi/{loan_id}")
def emi_schedule(loan_id: int):
    with Transaction() as cur:
        cur.execute(
            """
            SELECT id, installment_number, due_date, principal_due, interest_due, total_due, status, paid_date, penalty_applied
            FROM emi_schedule WHERE loan_id = %s ORDER BY installment_number
            """,
            (loan_id,)
        )
        rows = cur.fetchall()
        schedule = [
            {
                "id": r[0],
                "installment_number": r[1],
                "due_date": r[2].isoformat() if r[2] is not None else None,
                "principal_due": float(r[3]) if r[3] is not None else None,
                "interest_due": float(r[4]) if r[4] is not None else None,
                "total_due": float(r[5]) if r[5] is not None else None,
                "status": r[6],
                "paid_date": r[7].isoformat() if r[7] is not None else None,
                "penalty_applied": float(r[8]) if r[8] is not None else None,
            }
            for r in rows
        ]
        return {"status": "success", "data": schedule}