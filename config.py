# project/config.py

HOST = "127.0.0.1"
USER = "root"
PASSWD = "Password1"
DATABASE = "booking"


class BaseConfig(object):
    SECRET_KEY = 'my_precious'
    DEBUG = True
    BCRYPT_LOG_ROUNDS = 13
