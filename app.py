import datetime
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/project'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

class Events(db.Model):
    number = db.Column(db.Integer, primary_key= True)
    event = db.Column(db.String(100))
    body = db.Column(db.Text())
    date = db.Column(db.Integer)

    def __init__(self, event, body):
        self.event = event
        self.body = body

class ArticleSchema(ma.Schema):
    class Meta:
        fields = ('number', 'event', 'body', 'date')

article_schema = ArticleSchema()
articles_schema = ArticleSchema(many=True)

@app.route('/get', methods = ['GET'])
def get_articles():
    all_articles = Events.query.all()
    results = articles_schema.dump (all_articles)
    return jsonify(results)

@app.route('/get/<number>/', methods = ['GET'])
def post_details(number):
    article = Events.query.get(number)
    return article_schema.jsonify(article)

@app.route('/add', methods = ['POST'])
def add_article():
    event = request.json['event']
    body = request.json['body']

    articles = Events(event, body)
    db.session.add(articles)
    db.session.commit()
    return article_schema.jsonify(articles)

@app.route('/update/<number>/', methods = ['PUT'])
def update_article(number):
    article = Events.query.get(number)
    event = request.json['event']
    body = request.json['body']

    article.event = event
    article.body = body

    article.event = event
    article.body = body

    db.session.commit()
    return article_schema.jsonify(article)

if __name__ == "__main__":
    app.run(debug=True)