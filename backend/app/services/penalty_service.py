from datetime import datetime

def get_overdue_emis(cur):
    cur.execute("""
        SELECT id, loan_id, total_due, due_date
        FROM emi_schedule
        WHERE status = 'pending'
    """)
    
    emis = cur.fetchall()

    overdue = []

    for emi in emis:
        emi_id, loan_id, total_due, due_date = emi

        if datetime.now() > due_date:
            overdue.append(emi)

    return overdue
