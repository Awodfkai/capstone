from flask import Flask, request, Blueprint, jsonify
from flask_login import login_required
from werkzeug.utils import secure_filename
from ..forms import VideoForm
from ..models import Video
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
  print('inside api/videos/upload')
  if "user_file" not in request.files:
    return "No user_file key in request.files"
  file = request.files["user_file"]

  """
    file.filename
    file.content_type
    file.content_length
    file.mimetype
  """

  if file.filename == "":
    return "Please Select a file"
  
  if file and allowed_file(file.filename):
    file.filename = secure_filename(file.filename)
    url = upload_file_to_s3(file)
    return str(url)
  else:
    return redirect("/upload")

@video_routes.route('/create')
def addVideo():
  form = VideoForm()
  if form.validate():
    newVideo = Video(
        title=form.data['title'],
        description=form.data['description'],
        user_id = form.data['user_id'],
        url=form.data['url']
    )
    db.session.add(newVideo)
    print(newVideo)
    db.session.commit()
    return jsonify(newVideo)