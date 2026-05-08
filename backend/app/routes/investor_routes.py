from fastapi import APIRouter
from app.services.investment_service import fund_loan
from app.utils.transaction import Transaction

router = APIRouter()

@router.post("/fund-loan")
def fund(investor_id: int, loan_id: int, amount: float):
    try:
        fund_loan(investor_id, loan_id, amount)
        return {"status": "success"}
    except Exception as e:
        return {"status": "error", "message": str(e)}


@router.get("/investments")
def list_investments(loan_id: int = None, investor_id: int = None):
    with Transaction() as cur:
        if investor_id:
            cur.execute(
                """
                SELECT id, loan_id, investor_id, amount_invested, ownership_ratio
                FROM investments WHERE investor_id = %s
                """,
                (investor_id,)
            )
        elif loan_id:
            cur.execute(
                """
                SELECT id, loan_id, investor_id, amount_invested, ownership_ratio
                FROM investments WHERE loan_id = %s
                """,
                (loan_id,)
            )
        else:
            cur.execute(
                """
                SELECT id, loan_id, investor_id, amount_invested, ownership_ratio
                FROM investments
                """
            )

        rows = cur.fetchall()
        investments = [
            {
                "id": r[0],
                "loan_id": r[1],
                "investor_id": r[2],
                "amount_invested": float(r[3]) if r[3] is not None else None,
                "ownership_ratio": float(r[4]) if r[4] is not None else None,
            }
            for r in rows
        ]
        return {"status": "success", "data": investments}
