import time
from app.config.redis_client import r
from app.utils.transaction import Transaction
from app.services.default_service import check_and_handle_default

def run_default_worker():
    print("Default worker started...")

    while True:
        loan_id = r.rpop("default_check_queue")

        if loan_id:
            print(f"Processing loan {loan_id}")

            with Transaction() as cur:
                check_and_handle_default(cur, int(loan_id))

        time.sleep(1)