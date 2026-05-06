from backend.app.models.mongo_model import get_business_data
def calculate_credit_score(data):
    score = (
        data.get("monthly_revenue", 0) * 0.3 +
        data.get("payment_history_score", 0) * 50 +
        data.get("social_score", 0) * 20
    )
    return round(score, 2)

def evaluate_loan(cur, loan_id, business_id):
    data = get_business_data(business_id)
    if not data:
        raise Exception("No business data found")
    score = calculate_credit_score(data)

    cur.execute("""
        UPDATE loans
        SET credit_score = %s
        WHERE id = %s
    """, (score, loan_id))

    if score < 50:
        raise Exception("Loan rejected due to low credit score")