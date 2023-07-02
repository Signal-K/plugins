from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/read', methods=['GET'])
def read():
    return "This is the first textual component from the frontend, fetched by the API"

@app.route('/send', methods=['POST'])
def send():
    text = request.get_json()['text']
    return 'Cool'

if __name__ == '__main__':
    app.run(host='localhost', port=5000)