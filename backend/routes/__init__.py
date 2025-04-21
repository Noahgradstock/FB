from flask_cors import CORS
from flask import Flask

def create_app():
    app = Flask(__name__)
    CORS(app)  

    from routes.teames_data.plot_data import data 
    from routes.teames_data.data_routes_test import testdata 
    app.register_blueprint(data)
    app.register_blueprint(testdata)
      

    return app