from decimal import Decimal
from app.utils.transaction import Transaction
from app.models.account import get_account_by_user_id, update_balance
from app.models.ledger import add_ledger_entry

def buy_investment(listing_id, buyer_id):
    with Transaction() as cur:

        # 1. Get listing
        cur.execute("""
            SELECT investment_id, seller_id, price, status
            FROM secondary_market_listings
            WHERE id = %s
        """, (listing_id,))
        
        listing = cur.fetchone()

        if not listing:
            raise Exception("Listing not found")

        investment_id, seller_id, price, status = listing

        if status != 'open':
            raise Exception("Listing not available")

        price = Decimal(price)

        # 2. Get buyer account
        buyer_account = get_account_by_user_id(cur, buyer_id)
        seller_account = get_account_by_user_id(cur, seller_id)

        if not buyer_account or not seller_account:
            raise Exception("Account not found")

        buyer_acc_id = buyer_account[0]
        seller_acc_id = seller_account[0]

        # 3. Check buyer balance
        cur.execute("SELECT balance FROM accounts WHERE id = %s", (buyer_acc_id,))
        buyer_balance = cur.fetchone()[0]

        if buyer_balance < price:
            raise Exception("Insufficient funds")

        # 4. Transfer money
        update_balance(cur, buyer_acc_id, -price)
        update_balance(cur, seller_acc_id, price)

        # 5. Transfer ownership
        cur.execute("""
            UPDATE investments
            SET investor_id = %s
            WHERE id = %s
        """, (buyer_id, investment_id))

        # 6. Close listing
        cur.execute("""
            UPDATE secondary_market_listings
            SET status = 'sold'
            WHERE id = %s
        """, (listing_id,))

        # 7. Ledger entries
        add_ledger_entry(cur, buyer_acc_id, -price, "secondary_buy", investment_id)
        add_ledger_entry(cur, seller_acc_id, price, "secondary_sell", investment_id)

        print("Investment transferred successfully")
        
def list_investment_for_sale(cur, investment_id, seller_id, price):
    cur.execute("""
        INSERT INTO secondary_market_listings
        (investment_id, seller_id, price)
        VALUES (%s, %s, %s)
    """, (investment_id, seller_id, price))