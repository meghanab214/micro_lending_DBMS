from config.mongo import business_collection

def insert_business_data(data):
    return business_collection.insert_one(data)

def get_business_data(business_id):
    return business_collection.find_one({"business_id": business_id})