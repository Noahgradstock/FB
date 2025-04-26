from flask_cors import CORS
from flask import Flask

def create_app():
    app = Flask(__name__)
    CORS(app)  

    from routes.teames_data.send_data import data 
    from routes.teames_data.send_ua import testdata 
    app.register_blueprint(data)
    app.register_blueprint(testdata)
      

    return app