from flask import Flask, request, Blueprint, jsonify
from flask_login import login_required
from ..forms import FollowForm
from ..models import db, Follow, User
import sys

from ..helpers import *

follow_routes = Blueprint('follow', __name__)

@follow_routes.route('/<int:uid>/followers', methods=['GET'])
def getFollowers(uid):
  follows = Follow.query.filter_by(followed_id = uid).all()
  follow_list = [followSchema(follow) for follow in follows]
  return jsonify(follow_list)

@follow_routes.route('/<int:uid>/follows', methods=['GET'])
def getFollows(uid):
  follows = Follow.query.filter_by(follower_id = uid).all()
  follow_list = [followSchema(follow) for follow in follows]
  return jsonify(follow_list)

@follow_routes.route('/<int:uid>/<int:tid>/get', methods=['GET'])
def getFollowStatus(uid, tid):
  follows = Follow.query.filter_by(follower_id=uid,followed_id=tid).all()
  follow_list = [followSchema(follow) for follow in follows]
  if len(follow_list) > 0:
    return jsonify({'text': 'Following', 'follow':follow_list})
  return jsonify({'text':'Follow', 'follow':follow_list})

@follow_routes.route('/<int:uid>/<int:tid>', methods=['GET', 'POST'])
def setFollow(uid, tid):
  newFollow = Follow(
    follower_id=uid,
    followed_id=tid,
  )
  db.session.add(newFollow)
  db.session.commit()
  return jsonify('Following')
  
@follow_routes.route('/<int:uid>/<int:tid>', methods=['DELETE'])
def setUnfollow(uid, tid):
  follows = Follow.query.filter_by(follower_id = uid, followed_id = tid).all()
  item = follows[0]
  follow_list = [followSchema(follow) for follow in follows]
  if len(follow_list) > 0:
    db.session.delete(item)
    db.session.commit()
    return jsonify('Follow')
  return 405  