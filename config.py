# project/config.py

HOST = "ec2-54-235-67-106.compute-1.amazonaws.com"
USER = "mihsixtueqwsks"
PASSWD = "8b5f898789f8ab6632feea8da03a50352874e5ad63b9c2544c428bf68a0653e5"
DATABASE = "dbr8a90nqd6sff"
PORT = 5432


class BaseConfig(object):
    SECRET_KEY = 'my_precious'
    DEBUG = True
    BCRYPT_LOG_ROUNDS = 13
