# project/config.py

HOST = "us-cdbr-iron-east-03.cleardb.net"
USER = "b83fa2aadffbf8"
PASSWD = "e185523f"
DATABASE = "heroku_f92051b3cf3479d"


class BaseConfig(object):
    SECRET_KEY = 'my_precious'
    DEBUG = True
    BCRYPT_LOG_ROUNDS = 13
