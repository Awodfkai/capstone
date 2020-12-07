from flask import Flask, request, Blueprint, jsonify
from flask_login import login_required
from werkzeug.utils import secure_filename
from ..forms import VideoForm
from ..models import Video

video_routes = Blueprint('video', __name__)

from ..helpers import *

@video_routes.route('/upload')
@login_required
def upload():
  form = VideoForm()
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
  
  if file and allowed_file(file.filename) and form.validate():
    file.filename = secure_filename(file.filename)
    output = upload_file_to_s3(file, app.config["S3_BUCKET"])
    newVideo = Video(
      title=form.data['title'],
      description = form.data['description'],
      
    )
    return str(output)
  else:
    return redirect("/upload")