from .db import db


class Follow(db.Model):
  __tablename__ = 'follows'

  id = db.Column(db.Integer, primary_key=True)
  follower_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  followed_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)