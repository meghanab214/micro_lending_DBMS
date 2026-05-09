from app.config.mongo import business_collection

def insert_business_data(data):
    return business_collection.insert_one(data)

def get_business_data(business_id):
    return business_collection.find_one({"business_id": business_id})

# KYC documents collection
from app.config.mongo import db

kyc_collection = db["kyc_documents"]

def insert_kyc_document(doc):
    return kyc_collection.insert_one(doc)