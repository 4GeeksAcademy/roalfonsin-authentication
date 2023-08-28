"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def handle_signup():
    from app import bycrypt
    body = request.get_json()
    password = bycrypt.generate_password_hash(body['password']).decode('utf-8')
    user = User(email=body['email'], password=password, is_active=True)
    db.session.add(user)
    db.session.commit()
    return jsonify('User created'), 200

@api.route('/login', methods=['POST'])
def handle_login():
    from app import bycrypt
    body = request.get_json()
    user = User.query.filter_by(email=body['email']).first()
    if user is None:
        return jsonify('User not found'), 404
    if not bycrypt.check_password_hash(user.password, body['password']):
        return jsonify('Invalid password'), 401
    access_token = create_access_token(identity=user.email)
    return jsonify(access_token=access_token), 200