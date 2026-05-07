from fastapi import APIRouter
from app.utils.transaction import Transaction
from app.models.kyc import insert_kyc
from app.services.kyc_service import verify_kyc

router = APIRouter()

@router.post("/submit-kyc")
def submit_kyc(user_id: int, doc_type: str, doc_number: str):
    with Transaction() as cur:
        insert_kyc(cur, user_id, doc_type, doc_number)
    return {"status": "submitted"}


@router.post("/verify-kyc")
def verify(user_id: int):
    with Transaction() as cur:
        verify_kyc(cur, user_id)
    return {"status": "verified"}