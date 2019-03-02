from flask import Flask, render_template, json
from blog import control, service
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello1111 World!"

@app.route('/index', methods=["GET"])
def index():
    return render_template('index.html')

@app.route('/login', methods=["GET"])
def login():
    return render_template('login.html')

@app.route('/register', methods=["GET"])
def register():
    return render_template('register.html')

@app.route('/api/getArticles', methods=["GET"])
def api_getArticles():
    return service.getArticles()

@app.route('/api/getHotArticles', methods=["GET"])
def api_getHotArticles():
    return service.getHotArticles()

@app.route('/api/login', methods=["GET"])
def api_login():
    return service.login()

@app.route('/api/register', methods=["GET"])
def api_register():
    return control.ok()

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=9000)
