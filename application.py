from flask import Flask, render_template, json
from blog import control, service
app = Flask(__name__)

@app.route("/")
def hello():
    return render_template('index.html')

@app.route('/index', methods=["GET"])
def index():
    return render_template('index.html')

@app.route('/login', methods=["GET"])
def login():
    return render_template('login.html')

@app.route('/register', methods=["GET"])
def register():
    return render_template('register.html')

@app.route('/api/getArticles', methods=['POST'])
def api_getArticles():
    return service.getArticles()

@app.route('/api/getHotArticles', methods=['POST'])
def api_getHotArticles():
    return service.getHotArticles()

@app.route('/api/getArticleDetail', methods=['POST'])
def api_getArticleDetail():
    return service.getArticleDetail()

@app.route('/api/getComments', methods=['POST'])
def api_getComments():
    return service.getComments()

@app.route('/api/login', methods=['POST'])
def api_login():
    return service.login()

@app.route('/api/register', methods=['POST'])
def api_register():
    return service.register()

@app.route('/api/saveComment', methods=['POST'])
def api_saveComment():
    return service.saveComment()

@app.route('/api/saveArticle', methods=['POST'])
def api_saveArticle():
    return service.saveArticle()

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=9000)
