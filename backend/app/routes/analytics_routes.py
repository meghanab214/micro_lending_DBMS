from fastapi import APIRouter
from app.utils.transaction import Transaction

router = APIRouter()


@router.get("/analytics/summary")
def analytics_summary():
    with Transaction() as cur:
        # total loans, total funded, total outstanding, total repayments
        cur.execute("SELECT COUNT(*) FROM loans")
        total_loans = cur.fetchone()[0]

        cur.execute("SELECT COALESCE(SUM(funded_amount),0) FROM loans")
        total_funded = float(cur.fetchone()[0] or 0)

        cur.execute("SELECT COALESCE(SUM(amount_paid),0) FROM repayments")
        total_repayments = float(cur.fetchone()[0] or 0)

        cur.execute("SELECT COUNT(*) FROM loans WHERE status = 'defaulted'")
        defaults = cur.fetchone()[0]

        return {
            "status": "success",
            "data": {
                "total_loans": total_loans,
                "total_funded": total_funded,
                "total_repayments": total_repayments,
                "defaults": defaults,
            },
        }
