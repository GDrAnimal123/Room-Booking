# import sys
# sys.path.append("..")
# from extension import bcrypt


class User():

    def __init__(self, id=0, userID="", password="", admin=False):
        self.id = id
        self.userID = userID
        self.password = password
        # self.password = bcrypt.generate_password_hash(password)
        self.admin = admin

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def check_password(self, value):
        """Check password."""
        return bcrypt.check_password_hash(self.password, value)

    def is_anonymous(self):
        return False

    def get_id(self):
        return self.id

    def __repr__(self):
        return '<User id {0}-- userID {1} -- Password {2} -- Admin {3}>'.format(self.id, self.userID, self.password, self.admin)
