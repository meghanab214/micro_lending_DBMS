def get_loan(cur, loan_id):
    cur.execute("SELECT amount, funded_amount FROM loans WHERE id = %s", (loan_id,))
    return cur.fetchone()

def update_funded_amount(cur, loan_id, amount):
    cur.execute(
        "UPDATE loans SET funded_amount = funded_amount + %s WHERE id = %s",
        (amount, loan_id)
    )