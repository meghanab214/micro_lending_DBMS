from fastapi import APIRouter
from app.utils.transaction import Transaction
from app.models.kyc import insert_kyc
from app.services.kyc_service import verify_kyc
from app.models.mongo_model import insert_kyc_document

router = APIRouter()

@router.post("/submit-kyc")
def submit_kyc(user_id: int, doc_type: str, doc_number: str):
    with Transaction() as cur:
        insert_kyc(cur, user_id, doc_type, doc_number)
    # also persist the document metadata in Mongo for document storage/lookup
    try:
        insert_kyc_document({
            "user_id": int(user_id),
            "document_type": doc_type,
            "document_number": doc_number
        })
    except Exception:
        # non-critical on Mongo failure
        pass
    return {"status": "submitted"}


@router.post("/verify-kyc")
def verify(user_id: int):
    with Transaction() as cur:
        verify_kyc(cur, user_id)
    return {"status": "verified"}