def create_repayment(cur, loan_id, amount):
    cur.execute(
        """
        INSERT INTO repayments (loan_id, amount_paid)
        VALUES (%s, %s)
        RETURNING id
        """,
        (loan_id, amount)
    )
    return cur.fetchone()[0]