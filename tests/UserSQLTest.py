import sys
sys.path.append("..")

import unittest

from project.user.models import User
from database import UserSQL
# from extension import bcrypt


class UserSQLTest(unittest.TestCase):

    def setUp(self):

        print("Setup...")
        UserSQL.create_table()

        self.test_user1 = User(id=1, userID='admin', password='admin', admin=True)
        self.test_user2 = User(id=2, userID='user', password='user', admin=False)

        UserSQL.insert(self.test_user1)
        UserSQL.insert(self.test_user2)

    def tearDown(self):
        pass
        # print("Tear down...")
        # UserSQL.drop_table()

    def test_select_all(self):
        print("Testing select_all...")
        users = UserSQL.selectAll()
        self.assertEqual(len(users), 2)

    def test_select_by_userID(self):
        print("Testing select_by_UserID...")

        userID = 'admin'
        password = 'admin'
        users = UserSQL.selectByUserID(userID)

        self.assertEqual(len(users), 1)
        self.assertEqual(users[0].userID, 'admin')

    def test_insert(self):
        print("Testing insert...")

        test_user = User(0, "dpham", "password", False)

        UserSQL.insert(test_user)
        users = UserSQL.selectAll()

        self.assertEqual(len(users), 3)

    def test_update(self):
        print("Testing update...")
        test_user = self.test_user2
        test_user.userID = "updated"
        test_user.password = "updated"
        test_user.admin = True

        UserSQL.update(test_user)
        users = UserSQL.selectAll()
        user = UserSQL.selectByUserID(test_user.userID)[0]

        self.assertEqual(len(users), 2)
        self.assertEqual(user.userID, test_user.userID)
        self.assertEqual(user.password, test_user.password)
        self.assertEqual(user.admin in ["True", "1"], True)

    def test_delete(self):
        print("Testing delete...")
        test_user = self.test_user2

        UserSQL.delete(test_user)
        users = UserSQL.selectAll()

        self.assertEqual(len(users), 1)


if __name__ == '__main__':
    unittest.main()
