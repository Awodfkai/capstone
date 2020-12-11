from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired

class VideoForm(FlaskForm):
    title = StringField(validators=[DataRequired()])
    description = StringField()
    user_id = IntegerField(validators=[DataRequired()])
    url = StringField(validators=[DataRequired()])
    submit = SubmitField()