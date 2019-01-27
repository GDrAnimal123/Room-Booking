from project.user.models import User
from database import UserSQL

UserSQL.create_table()

test_user1 = User(id=1, userID='admin', password='admin', admin=True)
test_user2 = User(id=2, userID='user', password='user', admin=False)

UserSQL.insert(test_user1)
UserSQL.insert(test_user2)
