from .db import db
from datetime import datetime

class Video(db.Model):
  __tablename__ = 'videos'

  id = db.Column(db.Integer, primary_key = True)
  title = db.Column(db.String(40), nullable = False)
  description = db.Column(db.String(255))
  views = db.Column(db.Integer, nullable = False)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
  url = db.Column(db.String(255), nullable = False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

  comments = db.relationship("Comment", back_populates="video")
  likes = db.relationship("Like", back_populates="video")
  user = db.relationship("User", back_populates="videos")