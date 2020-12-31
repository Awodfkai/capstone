from flask import Flask, request, Blueprint, jsonify
from flask_login import login_required
from ..forms import FollowForm
from ..models import db, Follow, User

from ..helpers import *

follow_routes = Blueprint('follow', __name__)

@follow_routes.route('/<int:uid>/me', methods=['GET'])
def getFollows(uid):
  follows = Follow.query.filter_by(follower_id = uid).all()
  follow_list = [followSchema(follow) for follow in follows]
  return jsonify(follow_list)

@follow_routes.route('/<int:uid>/<int:tid>/get', methods=['GET'])
def getFollowStatus(uid, tid):
  try:
    follow = Follow.query.filter_by(follower_id=uid,followed_id=tid).one()
    if follow:
      return jsonify('Following')
  except:
    return jsonify('Follow')

@follow_routes.route('/<int:uid>/<int:tid>', methods=['GET', 'POST'])
def setFollow(uid, tid):
  print('in the follow route')
  newFollow = Follow(
    follower_id=tid,
    followed_id=uid,
  )
  db.session.add(newFollow)
  db.session.commit()
  return jsonify('Following')
  
@follow_routes.route('/<int:uid>/<int:tid>', methods=['DELETE'])
def setUnfollow(uid):
  follow = Follow.query.filter_by(follower_id = uid, followed_id = tid).one()
  if follow:
    return jsonify('Following')
  return jsonify('Follow')  