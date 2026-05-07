def create_collection_case(cur, loan_id, action):
    cur.execute("""
        INSERT INTO collections (loan_id, action)
        VALUES (%s, %s)
    """, (loan_id, action))


def get_collection_cases(cur, loan_id):
    cur.execute("""
        SELECT id, action, status, notes
        FROM collections
        WHERE loan_id = %s
    """, (loan_id,))
    
    return cur.fetchall()


def update_collection_status(cur, case_id, status, notes=None):
    cur.execute("""
        UPDATE collections
        SET status = %s,
            notes = %s,
            updated_at = NOW()
        WHERE id = %s
    """, (status, notes, case_id))