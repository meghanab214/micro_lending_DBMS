from app.models.collections import create_collection_case

def check_and_handle_default(cur, loan_id):

    # 1. Count overdue EMIs
    cur.execute("""
        SELECT COUNT(*)
        FROM emi_schedule
        WHERE loan_id = %s
        AND status = 'pending'
        AND due_date < NOW()
    """, (loan_id,))

    missed_count = cur.fetchone()[0]

    # 2. If 3 or more missed → default
    if missed_count >= 3:

        # Mark loan as defaulted
        cur.execute("""
            UPDATE loans
            SET status = 'defaulted'
            WHERE id = %s
        """, (loan_id,))

        # Create collection case
        create_collection_case(cur, loan_id, "initial_contact")

        print(f"Loan {loan_id} defaulted → collection started")