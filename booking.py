import os
import json

from flask import Flask

# from extension import bcrypt
from config import BaseConfig
from project import user, ticket

'''
Please also edit host and port in static\core\table\table.service.js 
if you want to edit this host and port

=> Basically we need to make sure angular client route to the right
Server url, otherwise we recieve nothing (404 error).
'''
host = "127.0.0.1"
port = "50"

def create_app(config_object=BaseConfig):
    """An application factory, as explained here:
    http://flask.pocoo.org/docs/patterns/appfactories/.
    :param config_object: The configuration object to use.
    """
    app = Flask(__name__, static_url_path='')
    app.config.from_object(BaseConfig)
    # register_extensions(app)
    register_blueprints(app)

    return app

# def register_extensions(app):
#     print(bcrypt)
#     bcrypt.init_app(app)

def register_blueprints(app):
    """Register Flask blueprints."""

    app.register_blueprint(user.views.blueprint)
    app.register_blueprint(ticket.views.blueprint)

app = create_app(BaseConfig)

@app.route('/')
def home():
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run(host=host, port=port)
