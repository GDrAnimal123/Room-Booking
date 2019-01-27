import pymysql
pymysql.install_as_MySQLdb()
from project.ticket.models import Ticket
from project.user.models import User

from config import *


class UserSQL(object):

    def __init__(self):
        pass

    @staticmethod
    def create_table():
        # Open database connection
        db = pymysql.connect(host=HOST, user=USER,
                             passwd=PASSWD, db=DATABASE)

        # prepare a cursor object using cursor() method
        cursor = db.cursor()

        # Drop table if it already exist using execute() method.
        cursor.execute("DROP TABLE IF EXISTS user")

        # Create table as per requirement
        sql = """CREATE TABLE user (
                ID INT NOT NULL AUTO_INCREMENT,
                userID  CHAR(50) NOT NULL,
                password  CHAR(100),
                admin CHAR(20),
                PRIMARY KEY (ID)
            );"""

        cursor.execute(sql)
        db.close()

    @staticmethod
    def drop_table():
        # Open database connection
        db = pymysql.connect(host=HOST, user=USER,
                             passwd=PASSWD, db=DATABASE)

        # prepare a cursor object using cursor() method
        cursor = db.cursor()

        # Drop table if it already exist using execute() method.
        cursor.execute("DROP TABLE IF EXISTS user")

        db.close()

    @staticmethod
    def selectAll():
        # Connect to database
        db = pymysql.connect(host=HOST, user=USER,
                             passwd=PASSWD, db=DATABASE)
        cursor = db.cursor()

        # SQL command
        sql = """SELECT * FROM user"""
        users = []
        try:
            # Execute the SQL command
            cursor.execute(sql)
            results = cursor.fetchall()
            for row in results:
                id, userID, password, admin = row[0], row[1], row[2], row[3]
                user = User(userID, password, admin)
                users.append(user)
        except Exception as error:
            print("Unable to fetch data: ", error)
        # disconnect from server
        db.close()
        return users

    @staticmethod
    def selectByUserID(userID):

        # Connect to database
        db = pymysql.connect(host=HOST, user=USER,
                             passwd=PASSWD, db=DATABASE)
        cursor = db.cursor()

        # SQL command
        sql = """SELECT * FROM `User` \
                 WHERE `User`.userID = %(userID)s"""
        params = {"userID": userID}

        users = []
        try:
            # Execute the SQL command
            cursor.execute(sql, params)
            results = cursor.fetchall()
            for row in results:
                id, userID, password, admin = row[0], row[1], row[2], row[3]
                user = User(id, userID, password, admin)
                users.append(user)
        except Exception as error:
            print("Unable to fetch data: ", error)
        # disconnect from server
        db.close()

        return users

    @staticmethod
    def insert(object):
        id, userID, password, admin = object.id, object.userID, object.password, object.admin

        # Connect to database
        db = pymysql.connect(host=HOST, user=USER,
                             passwd=PASSWD, db=DATABASE)
        cursor = db.cursor()

        # SQL command
        sql = """INSERT INTO
            User(userID, password, admin)
                 VALUES
            (%(userID)s, %(password)s, %(admin)s)"""
        params = {"userID": userID, "password": password, "admin": admin}
        try:
            # Execute the SQL command
            cursor.execute(sql, params)
            # Commit your changes in the database
            db.commit()
        except Exception as error:
            # Rollback in case there is any error
            print(error)
            db.rollback()
        # disconnect from server
        db.close()

    @staticmethod
    def update(object):
        id, userID, password, admin = object.id, object.userID, object.password, object.admin

        # Connect to database
        db = pymysql.connect(host=HOST, user=USER,
                             passwd=PASSWD, db=DATABASE)
        cursor = db.cursor()

        # SQL command
        sql = """UPDATE User SET `User`.userID = %(userID)s, `User`.password = %(password)s,
                                 `User`.admin = %(admin)s
                 WHERE `User`.id = %(id)s"""
        params = {"id": id, "userID": userID, "password": password, "admin": admin}

        try:
            # Execute the SQL command
            cursor.execute(sql, params)
            # Commit your changes in the database
            db.commit()
        except:
            # Rollback in case there is any error
            db.rollback()
        # disconnect from server
        db.close()

    @staticmethod
    def delete(object):
        id = object.id
        # Connect to database
        db = pymysql.connect(host=HOST, user=USER,
                             passwd=PASSWD, db=DATABASE)
        cursor = db.cursor()

        sql = """DELETE FROM User
                 WHERE `User`.id = %(id)s"""
        params = {"id": id}

        try:
            # Execute the SQL command
            cursor.execute(sql, params)
            # Commit your changes in the database
            db.commit()
        except:
            # Rollback in case there is any error
            db.rollback()
        # disconnect from server
        db.close()

    @staticmethod
    def isExisted(object):

        if len(users) > 0:
            return True
        else:
            return False


class TicketSQL(object):

    def __init__(self):
        pass

    @staticmethod
    def create_table():
        # Open database connection
        db = pymysql.connect(host=HOST, user=USER,
                             passwd=PASSWD, db=DATABASE)

        # prepare a cursor object using cursor() method
        cursor = db.cursor()

        # Drop table if it already exist using execute() method.
        cursor.execute("DROP TABLE IF EXISTS Ticket")

        # Create table as per requirement
        sql = """CREATE TABLE Ticket (
                ID INT NOT NULL AUTO_INCREMENT,
                userID  CHAR(50) NOT NULL,
                room  CHAR(20),
                title CHAR(100),
                description CHAR(200),
                start CHAR(100),
                end CHAR(100),
                timestamp BIGINT,
                PRIMARY KEY (ID)
            );"""

        cursor.execute(sql)
        db.close()

    @staticmethod
    def drop_table():
        # Open database connection
        db = pymysql.connect(host=HOST, user=USER,
                             passwd=PASSWD, db=DATABASE)

        # prepare a cursor object using cursor() method
        cursor = db.cursor()

        # Drop table if it already exist using execute() method.
        cursor.execute("DROP TABLE IF EXISTS Ticket")

        db.close()

    @staticmethod
    def selectAll():
        # Connect to database
        db = pymysql.connect(host=HOST, user=USER,
                             passwd=PASSWD, db=DATABASE)
        cursor = db.cursor()

        # SQL command
        sql = """SELECT * FROM Ticket"""
        tickets = []
        try:
            # Execute the SQL command
            cursor.execute(sql)
            results = cursor.fetchall()
            for row in results:
                id, userID, room, title, description, start, end, timestamp = row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7]
                ticket = Ticket(id, userID, room, title, description, start, end, timestamp)
                tickets.append(ticket)
        except Exception as error:
            print("Unable to fetch data: ", error)
        # disconnect from server
        db.close()
        return tickets

    @staticmethod
    def selectByRoomAndTimestamps(room, timestamps):
        # Connect to database
        db = pymysql.connect(host=HOST, user=USER,
                             passwd=PASSWD, db=DATABASE)
        cursor = db.cursor()

        # SQL command
        sql = """SELECT * FROM `Ticket` \
                 WHERE `Ticket`.room = %(room)s AND `Ticket`.timestamp IN %(timestamps)s"""
        params = {'room': room, 'timestamps': tuple(timestamps)}

        tickets = []
        try:
            # Execute the SQL command
            cursor.execute(sql, params)
            results = cursor.fetchall()
            for row in results:
                id, userID, room, title, description, start, end, timestamp = row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7]
                ticket = Ticket(id, userID, room, title, description, start, end, timestamp)
                tickets.append(ticket)
        except Exception as error:
            print("Unable to fetch data: ", error)
        # disconnect from server
        db.close()
        return tickets

    @staticmethod
    def insert(object):
        userID, room, title, description, start, end, timestamp = object.userID, object.room, object.title, object.description, object.start, object.end, object.timestamp

        # Connect to database
        db = pymysql.connect(host=HOST, user=USER,
                             passwd=PASSWD, db=DATABASE)
        cursor = db.cursor()

        # SQL command
        sql = """INSERT INTO
            TICKET(userID, room, title, description, start, end, timestamp)
                 VALUES
            (%(userID)s, %(room)s, %(title)s, %(description)s, %(start)s, %(end)s, %(timestamp)s)"""
        params = {"userID": userID, "room": room, "title": title, "description": description, "start": start, "end": end, "timestamp": timestamp}
        try:
            # Execute the SQL command
            cursor.execute(sql, params)
            # Commit your changes in the database
            db.commit()
        except Exception as error:
            # Rollback in case there is any error
            print(error)
            db.rollback()
        # disconnect from server
        db.close()

    @staticmethod
    def update(object):
        id, title, description, start, end = object.id, object.title, object.description, object.start, object.end

        # Connect to database
        db = pymysql.connect(host=HOST, user=USER,
                             passwd=PASSWD, db=DATABASE)
        cursor = db.cursor()

        # SQL command
        sql = """UPDATE Ticket SET `Ticket`.title = %(title)s, `Ticket`.description = %(description)s,
                                   `Ticket`.start = %(start)s, `Ticket`.end = %(end)s
                 WHERE `Ticket`.id = %(id)s"""
        params = {"id": id, "title": title, "description": description, "start": start, "end": end}

        try:
            # Execute the SQL command
            cursor.execute(sql, params)
            # Commit your changes in the database
            db.commit()
        except:
            # Rollback in case there is any error
            db.rollback()
        # disconnect from server
        db.close()

    @staticmethod
    def delete(object):
        # userID, room, title, description, start, end, timestamp = object.userID, object.room, object.title, object.description, object.start, object.end, object.timestamp
        id = object.id
        # Connect to database
        db = pymysql.connect(host=HOST, user=USER,
                             passwd=PASSWD, db=DATABASE)
        cursor = db.cursor()

        sql = """DELETE FROM Ticket
                 WHERE `Ticket`.id = %(id)s"""
        params = {"id": id}

        try:
            # Execute the SQL command
            cursor.execute(sql, params)
            # Commit your changes in the database
            db.commit()
        except:
            # Rollback in case there is any error
            db.rollback()
        # disconnect from server
        db.close()

    @staticmethod
    def isExisted(object):
        id = object.id

        # Connect to database
        db = pymysql.connect(host=HOST, user=USER,
                             passwd=PASSWD, db=DATABASE)
        cursor = db.cursor()

        # SQL command
        sql = """SELECT * FROM `Ticket` \
                 WHERE `Ticket`.id = %(id)s"""
        params = {"id": id}

        tickets = []
        try:
            # Execute the SQL command
            cursor.execute(sql, params)
            results = cursor.fetchall()
            for row in results:
                id, userID, room, title, description, start, end, timestamp = row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7]
                ticket = Ticket(id, userID, room, title, description, start, end, timestamp)
                tickets.append(ticket)
        except Exception as error:
            print("Unable to fetch data: ", error)
        # disconnect from server
        db.close()

        if len(tickets) > 0:
            return True
        else:
            return False
