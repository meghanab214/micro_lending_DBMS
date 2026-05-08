from fastapi import APIRouter
from app.utils.transaction import Transaction

router = APIRouter()


@router.get("/collections")
def list_collections():
    with Transaction() as cur:
        cur.execute(
            """
            SELECT id, loan_id, action, status, notes, created_at, updated_at
            FROM collections ORDER BY created_at DESC
            """
        )
        rows = cur.fetchall()
        collections = [
            {
                "id": r[0],
                "loan_id": r[1],
                "action": r[2],
                "status": r[3],
                "notes": r[4],
                "created_at": r[5].isoformat() if r[5] is not None else None,
                "updated_at": r[6].isoformat() if r[6] is not None else None,
            }
            for r in rows
        ]
        return {"status": "success", "data": collections}
