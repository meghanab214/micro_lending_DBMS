from fastapi import APIRouter
from app.utils.transaction import Transaction

router = APIRouter()


@router.get("/listings")
def list_listings():
    with Transaction() as cur:
        cur.execute(
            """
            SELECT s.id, s.investment_id, s.seller_id, s.price, s.status, i.loan_id, i.amount_invested
            FROM secondary_market_listings s
            LEFT JOIN investments i ON s.investment_id = i.id
            """
        )
        rows = cur.fetchall()
        listings = [
            {
                "id": r[0],
                "investment_id": r[1],
                "seller_id": r[2],
                "price": float(r[3]) if r[3] is not None else None,
                "status": r[4],
                "loan_id": r[5],
                "amount_invested": float(r[6]) if r[6] is not None else None,
            }
            for r in rows
        ]
        return {"status": "success", "data": listings}


@router.post("/buy-investment")
def buy_investment(buyer_id: int, listing_id: int):
    with Transaction() as cur:
        cur.execute(
            """
            SELECT s.id, s.investment_id, s.seller_id, s.price, s.status, i.loan_id, i.amount_invested, i.ownership_ratio
            FROM secondary_market_listings s
            LEFT JOIN investments i ON s.investment_id = i.id
            WHERE s.id = %s
            """,
            (listing_id,)
        )
        row = cur.fetchone()
        if not row:
            return {"status": "error", "message": "Listing not found"}

        if row[4] != 'open':
            return {"status": "error", "message": "Listing is not available"}

        loan_id = row[5]
        amount_invested = row[6]
        ownership_ratio = row[7]

        cur.execute(
            """
            INSERT INTO investments (loan_id, investor_id, amount_invested, ownership_ratio)
            VALUES (%s, %s, %s, %s)
            RETURNING id
            """,
            (loan_id, buyer_id, amount_invested, ownership_ratio)
        )
        new_investment_id = cur.fetchone()[0]

        cur.execute(
            "UPDATE secondary_market_listings SET status = 'sold' WHERE id = %s",
            (listing_id,)
        )

        return {"status": "success", "data": {"investment_id": new_investment_id, "listing_id": listing_id}}
