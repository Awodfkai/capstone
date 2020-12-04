from .db import db
from datetime import datetime

class Comment(db.Model):
  __tablename__ = 'comments'

  id = db.Column(db.Integer, primary_key = True)
  video_id = db.Column(db.Integer, db.ForeignKey("videos.id"), nullable = False)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
  text = db.Column(db.String(255), nullable = False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

  user = db.relationship("User", back_populates="comments")
  video = db.relationship("Video", back_populates="comments")

