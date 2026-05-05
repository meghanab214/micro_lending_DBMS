def create_investment(cur, loan_id, investor_id, amount, ratio):
    cur.execute(
        """
        INSERT INTO investments (loan_id, investor_id, amount_invested, ownership_ratio)
        VALUES (%s, %s, %s, %s)
        """,
        (loan_id, investor_id, amount, ratio)
    )
    
def get_investments_by_loan(cur, loan_id):
    cur.execute(
        """
        SELECT investor_id, amount_invested, ownership_ratio
        FROM investments
        WHERE loan_id = %s
        """,
        (loan_id,)
    )
    return cur.fetchall()