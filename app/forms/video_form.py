from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class VideoForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    description = StringField('description')
    user_id = IntegerField('user_id', validators=[DataRequired()])
    url = StringField('url', validators=[DataRequired()])