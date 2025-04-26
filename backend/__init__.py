from flask import Flask
from flask_cors import CORS
from routes.teames_data.send_data import data
from routes.teames_data.send_ua import testdata

def create_app():
    app = Flask(__name__)
    CORS(app)  

    app.register_blueprint(testdata)
    app.register_blueprint(data)

    return app