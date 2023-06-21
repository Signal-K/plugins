from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/plugins')
def get_plugins():
    plugins = ['plugin_a', 'plugin_b', 'plugin_c']  # This will be retrieved from the config file at root
    return jsonify(plugins)

if __name__ == '__main__':
    app.run(port=4569)