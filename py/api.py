import os
import sys

from flask import Flask

app = Flask(__name__)

@app.route('/test', methods=['POST'])
def handle_post():
    print('POST request received')
    return 'Success', 200

if __name__ == '__main__':
    app.run()
