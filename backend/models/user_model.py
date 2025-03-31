from werkzeug.security import generate_password_hash, check_password_hash


class User:
    def __init__(self, username, password):
        self.username = username
        self.password = generate_password_hash(password)

    def save_to_db(self, collection):
        user_data = {
            "username": self.username,
            "password": self.password,
        }
        collection.insert_one(user_data)

    @staticmethod
    def find_by_username(username, collection):
        return collection.find_one({"username": username})

    @staticmethod
    def verify_password(stored_password, provided_password):
        return check_password_hash(stored_password, provided_password)
