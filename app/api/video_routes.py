from flask import Flask, request, Blueprint, jsonify
from flask_login import login_required
from werkzeug.utils import secure_filename
from ..forms import VideoForm
from ..models import db, Video
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
  videos = Video.query.order_by(Video.views).all()
  videos_list = [videoSchema(video) for video in videos]
  return jsonify(videos_list)