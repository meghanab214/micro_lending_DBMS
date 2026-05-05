from app.utils.transaction import Transaction
from datetime import datetime, timedelta
import math

def generate_emi_schedule(loan_id, principal, annual_rate, months):
    with Transaction() as cur:

        monthly_rate = annual_rate / (12 * 100)

        emi = (principal * monthly_rate * (1 + monthly_rate)**months) / ((1 + monthly_rate)**months - 1)

        remaining_principal = principal

        for i in range(1, months + 1):

            interest = remaining_principal * monthly_rate
            principal_component = emi - interest

            due_date = datetime.now() + timedelta(days=30*i)

            cur.execute("""
                INSERT INTO emi_schedule
                (loan_id, installment_number, due_date, principal_due, interest_due, total_due)
                VALUES (%s, %s, %s, %s, %s, %s)
            """, (
                loan_id,
                i,
                due_date,
                round(principal_component, 2),
                round(interest, 2),
                round(emi, 2)
            ))

            remaining_principal -= principal_component

        print("EMI schedule created")