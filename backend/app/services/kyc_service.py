from app.models.kyc import get_kyc_status, update_kyc_status

def check_kyc(cur, user_id):
    result = get_kyc_status(cur, user_id)

    if not result:
        raise Exception("KYC not submitted")

    status = result[0]

    if status != "verified":
        raise Exception("KYC not verified")


def verify_kyc(cur, user_id):
    update_kyc_status(cur, user_id, "verified")