import time
from app.config.redis_client import r
from app.utils.transaction import Transaction

def run_penalty_worker():
    print("Penalty worker started...")

    while True:
        loan_id = r.rpop("penalty_queue")

        if loan_id:
            print(f"Checking penalties for loan {loan_id}")
            # You can call penalty scan logic here

        time.sleep(1)