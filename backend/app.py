from flask import Flask
from flask_cors import CORS
from routes.teames_data.send_data import data_routes 
from routes.teames_data.send_ua import data_routes_test


app = Flask(__name__)
CORS(app)

app.register_blueprint(data_routes_test)
app.register_blueprint(data_routes)

if __name__ == '__main__':
    app.run(debug=True, port=8080)