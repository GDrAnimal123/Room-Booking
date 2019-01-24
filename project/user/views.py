import json

from flask import request, jsonify, Blueprint, session

blueprint = Blueprint(
    'user', __name__
)


@blueprint.route('/api/login', methods=['POST'])
def login():
    from database import UserSQL
    # from extension import bcrypt

    json_data = request.json
    # Filter username
    user = UserSQL.selectByUserID(json_data['userID'])[0]

    # Check password is correct.
    # if user and bcrypt.check_password_hash(user.password, json_data['password']):
    if user and user.password == json_data['password']:
        # create session
        session['logged_in'] = True
        session['userID'] = json_data['userID']

        status = True
    else:
        status = False
    return jsonify({'result': status})


@blueprint.route('/api/logout')
def logout():
    session.pop('logged_in', None)
    session.pop('userID', None)
    return jsonify({'result': 'success'})


@blueprint.route('/api/status')
def status():
    if session.get('logged_in'):
        if session['logged_in']:
            return jsonify({'status': True})
    else:
        return jsonify({'status': False})


@blueprint.route('/api/profile')
def profile():
    from database import UserSQL
    from utils import ObjectEncoder

    user = UserSQL.selectByUserID(session['userID'])[0]

    return jsonify({'user': json.dumps(user, cls=ObjectEncoder)})
