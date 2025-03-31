from pymongo import MongoClient
import os
from dotenv import load_dotenv
load_dotenv()
# MongoDB URI (Replace with the correct connection string)
MONGO_URI = os.getenv(
    "MONGODB_URI"
)

# Connect to MongoDB Atlas
client = MongoClient(MONGO_URI)

# Correct database name
db = client["casaprodb"]

# Collections
users_collection = db["users"]
