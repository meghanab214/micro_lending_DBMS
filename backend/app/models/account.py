def get_account_by_user(cur, user_id):
    cur.execute("SELECT id, balance FROM accounts WHERE user_id = %s", (user_id,))
    return cur.fetchone()

def update_balance(cur, account_id, amount):
    cur.execute(
        "UPDATE accounts SET balance = balance + %s WHERE id = %s",
        (amount, account_id)
    )