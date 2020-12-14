from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
    user_id = IntegerField(validators=[DataRequired()])
    text = StringField(validators=[DataRequired()])