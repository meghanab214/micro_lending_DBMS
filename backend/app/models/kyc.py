def get_kyc_status(cur, user_id):
    cur.execute("""
        SELECT status FROM kyc WHERE user_id = %s
    """, (user_id,))
    
    return cur.fetchone()


def insert_kyc(cur, user_id, doc_type, doc_number):
    cur.execute("""
        INSERT INTO kyc (user_id, document_type, document_number)
        VALUES (%s, %s, %s)
    """, (user_id, doc_type, doc_number))


def update_kyc_status(cur, user_id, status):
    cur.execute("""
        UPDATE kyc
        SET status = %s
        WHERE user_id = %s
    """, (status, user_id))