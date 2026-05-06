from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["micro_lending"]

business_collection = db["business_data"]