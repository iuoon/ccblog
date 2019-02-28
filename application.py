from flask import Flask,render_template
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

@app.route('/index', methods=["GET"])
def index():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(host='127.0.0.1',port=9000)