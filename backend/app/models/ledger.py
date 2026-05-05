def add_ledger_entry(cur, account_id, amount, type, reference_id):
    cur.execute(
        """
        INSERT INTO ledger_entries (account_id, amount, type, reference_id)
        VALUES (%s, %s, %s, %s)
        """,
        (account_id, amount, type, reference_id)
    )