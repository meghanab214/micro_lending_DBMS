def create_investment(cur, loan_id, investor_id, amount, ratio):
    cur.execute(
        """
        INSERT INTO investments (loan_id, investor_id, amount_invested, ownership_ratio)
        VALUES (%s, %s, %s, %s)
        """,
        (loan_id, investor_id, amount, ratio)
    )