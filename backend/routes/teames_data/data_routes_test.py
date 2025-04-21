from flask import Blueprint, jsonify


data_routes_test = Blueprint('testdata', __name__)

@data_routes_test.route('/api/hej', methods=['GET'])
def get_data():
    return jsonify({'testdata': [9999, 2, 3, 4]})

