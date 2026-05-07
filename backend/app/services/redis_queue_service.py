from app.config.redis_client import r

# Add job to queue
def add_default_check_job(loan_id):
    r.lpush("default_check_queue", loan_id)


# Add penalty check job
def add_penalty_job(loan_id):
    r.lpush("penalty_queue", loan_id)