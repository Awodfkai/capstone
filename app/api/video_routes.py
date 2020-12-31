from flask import Flask, request, Blueprint, jsonify
from flask_login import login_required
from werkzeug.utils import secure_filename
from ..forms import VideoForm, CommentForm
from ..models import db, Video, User, Comment, Follow
from ..config import Config

video_routes = Blueprint('video', __name__)

from ..helpers import *

ALLOWED_EXTENSIONS = {'mp4'}

def allowed_file(filename):
  return '.' in filename and \
    filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@video_routes.route('/upload', methods=['GET', 'POST'])
@login_required
def upload():

  if "user_file" not in request.files:
    return "No user_file key in request.files"
  
  file = request.files["user_file"]
  print('file inside upload: ', file)

  """
    file.filename
    file.content_type
    file.content_length
    file.mimetype
  """

  if file.filename == "":
    return "Please Select a file"
  print('is python retarded?????????????')
  if file and allowed_file(file.filename):
    file.filename = secure_filename(file.filename)
    url = upload_file_to_s3(file)
    print('returned url in upload: ', str(url))
    return jsonify(str(url))
  else:
    return 400

@video_routes.route('/create', methods=['GET', 'POST'])
@login_required
def addVideo():
  form = VideoForm()
  defaultViews = 0
  form['csrf_token'].data = request.cookies['csrf_token']
  print('Form in video_routes api/video/create ', form.data)
  if form.validate():
    newVideo = Video(
        title=form.data['title'],
        description=form.data['description'],
        views=defaultViews,
        user_id = form.data['user_id'],
        url=form.data['url']
    )
    db.session.add(newVideo)
    print(newVideo)
    db.session.commit()
    return jsonify('success')
  else:
    return jsonify('not nice')

@video_routes.route('/', methods=['GET'])
def getVideos():
  videos = Video.query.order_by(Video.views.desc()).all()
  videos_list = [videoSchema(video) for video in videos]
  return jsonify(videos_list)

@video_routes.route('/<int:uid>/following', methods=['GET'])
def getFollowedVideos(uid):
  follows = Follow.query.filter_by(follower_id=uid).all()
  followed = [follow.followed_id for follow in follows]
  videos = Video.query.filter(Video.user_id.in_(followed)).order_by(Video.created_at).all()
  videos_list = [videoSchema(video) for video in videos]
  return jsonify(videos_list)

@video_routes.route('/<int:vid>', methods=['GET'])
def getVideo(vid):
  print('inside get by id video route............')
  video = Video.query.get(vid)
  user = User.query.get(video.user_id)
  return jsonify({'video': videoSchema(video), 'user': userSchema(user)})

@video_routes.route('/<int:vid>/watch', methods=['PUT'])
def watchVideo(vid):
  print('inside get by id video route............')
  video = Video.query.get(vid)
  video.views = video.views + 1
  db.session.commit()
  return 'views updated'

@video_routes.route('/<int:vid>/comments', methods=['GET'])
def getComments(vid):
  comments = Comment.query.filter(Comment.video_id == vid).order_by(Comment.created_at)
  comment_list = [commentSchema(comment) for comment in comments]
  return jsonify(comment_list)

@video_routes.route('/<int:vid>/comment', methods=['POST'])
def postComment(vid):
  form = CommentForm()
  if form.data:
    newComment = Comment(
      video_id=vid,
      user_id=form.data['user_id'],
      text=form.data['text'],
    )
    db.session.add(newComment)
    db.session.commit()
    return jsonify('success')
  return jsonify('failure')