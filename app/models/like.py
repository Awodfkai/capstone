from .db import db
from datetime import datetime

class Like(db.Model):
  __tablename__ = 'likes'

  id = db.Column(db.Integer, primary_key = True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
  video_id = db.Column(db.Integer, db.ForeignKey("videos.id"), nullable = False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

  video = db.relationship("Video", back_populates="likes")
  user = db.relationship("User", back_populates="likes")