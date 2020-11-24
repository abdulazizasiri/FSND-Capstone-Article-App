import os
from flask import Flask, request, jsonify, abort
from sqlalchemy import exc
import json
from flask_cors import CORS
from flask_migrate import Migrate
from database.models import db_drop_and_create_all, setup_db
from database.models import Category, Article, db
from auth.auth import AuthError, requires_auth

app = Flask(__name__)
setup_db(app)
CORS(app)
migrate = Migrate(app, db)


# db_drop_and_create_all()

'''
GET /categories
it should require the 'get:categories' permission
it should contain only the list of categories of all articles
returns status code 200 and json array
[{"success": True, "categories" : categories , "length": len(categories)}]
where categories is the list of categories
or appropriate status code indicating reason for failure
'''


@app.route('/categories')
@requires_auth('get:categories')
def get_all_categories(jwt):
    print(f" jwt is {jwt}")
    categories = Category.query.all()
    cat_arr = []
    cat_obj = {}
    for cat in categories:
        cat_obj['id'] = cat.id
        cat_obj['category_name'] = cat.category_name
        cat_arr.append(cat_obj)
        cat_obj = {}

    return jsonify([{"success": True, "categories": cat_arr, "length": len(categories)}])


'''
GET /articles
it should require the 'get:articles' permission
it should contain only the list of articles.
returns status code 200 and json array [{"success": True, "articles" : articles , "length": len(articles )}]
where articles is the list of articles
or appropriate status code indicating reason for failure
'''


@app.route('/articles')
@requires_auth('get:articles')
def get_all_articles(jwt):
    # print(f"Token found {jwt}")
    articles = Article.query.all()

    article_arr = []
    article_obj = {}
    for article in articles:
        article_obj['id'] = article.id
        article_obj['title'] = article.title
        article_obj['image_url'] = article.image_url
        article_obj['content'] = article.content
        article_obj['likes'] = article.likes
        article_arr.append(article_obj)
        article_obj = {}

    return jsonify([{"success": True, "articles": article_arr, "length": len(articles)}])


'''
GET /articles/<int:article_id>
it should require the 'get:articles' permission
it should contain a specific article
returns status code 200 and json array {"success": True, "article_id" : article_id )}
where articles_id is the the article that we want to view
or appropriate status code indicating reason for failure
'''


@app.route('/articles/<int:article_id>')
@requires_auth('get:articles')
def get_specific_Article(jwt, article_id):
    print(f" artilce id passed is {article_id}")
    article_found = Article.query.get(article_id)
    category_name = Category.query.get(article_found.category_id)
    article_obj = {'id': article_found.id, 'title': article_found.title, 'category': category_name.category_name, 'image': article_found.image_url, 'contet': article_found.content, 'likes': article_found.likes}

    return jsonify({"success": True, "article": article_obj})


'''
PATCH /articles/<int:article_id>
it should require the 'edite:articles' permission
it should update certain properties of a specific article.
returns status code 200 and json array {"success": True, "article_id" : article_id )}
where articles_id is the the article that we want to view
or appropriate status code indicating reason for failure
'''


@app.route('/articles/<int:article_id>', methods=["PATCH"])
@requires_auth('edite:articles')
def update_specific_article(jwt, article_id):
    print(f" artilce id passed is {article_id}")
    article = Article.query.get(article_id)

    json = request.get_json()
    print(f" JSON {json}")
    article.title = json['title']
    article.content = json['contet']
    article.image_url = json['image']
    article.likes = json['likes']
    article.update()
    return jsonify({"success": True, "article_id": article_id})


'''
DELETE /articles/<int:article_id>
it should require the 'delete:articles' permission
it should delete an article. This method should be granted for people who can do that
returns status code 200 and json array {"success": True, "article_id" : article_id )}
where articles_id is the the article that we want to view
or appropriate status code indicating reason for failure
'''


@app.route('/articles/<int:article_id>', methods=["DELETE"])
@requires_auth('delete:articles')
def deleted_specific_article(jwt, article_id):
    article = Article.query.get(article_id)
    category = Category.query.get(article.category_id)

    try:
        category.delete()
    except Exception:
        category.rollback()
    finally:
        category.close()

    try:
        article.delete()
    except Exception:
        article.rollback()
    finally:
        article.close()
    return jsonify({"success": True, "article_id": article_id})


'''
@TODO implement endpoint
POST /articles
it should require the 'get:drinks-detail' permission
it should contain the drink.long() data representation

returns status code 200 and json {"success": True, "drinks": drinks}
where drinks is the list of drinks
or appropriate status code indicating reason for failure
'''


'''
POST /articles
it should create a new row in the article table or category if it does not exsit
it should require the 'post:drinks' permission
it should contain the drink.long() data representation

returns status code 200 and json {"success" : True, "drinks" : drink }
where drink an array containing only the newly created drink
or appropriate status code indicating reason for failure
'''


@app.route('/articles', methods=['POST'])
@requires_auth('post:articles')
def create_Article(jwt):
    json = request.get_json()
    print(f" json arrived is {json}")
    title = json['title']
    image = json['image']
    category = json['category'].lower()
    article = json['contet']
    is_found = Category.query.filter_by(category_name=category).all()
    if len(is_found) > 0:
        print(f" stored before {is_found}")

    items = Category.query.filter_by(category_name=category).all()
    print(f"Length of categories {len(items)}")
    if (len(items) > 0):
        print(f" category  {items[0].id}")
        article_item = Article(title=title, image_url=image, category_id=items[len(items) - 1].id, content=article, likes=0)
        article_item.insert()
        return jsonify({"success": True, "article": "article_item"})

    category_item = Category(category_name=category.lower())

    category_item.flush()
    article_item = Article(title=title, image_url=image, category_id=category_item.id, content=article, likes=0)
    category_item.insert()
    article_item.insert()
    print("POSTED ")
    return jsonify({"success": True, "article": "article_item"})


'''
PATCH /drinks/<id>
where <id> is the existing model id
it should respond with a 404 error if <id> is not found
it should update the corresponding row for <id>
it should require the 'patch:drinks' permission
it should contain the drink.long() data representation

returns status code 200 and json {"success": True, "drinks": drink}
where drink an array containing only the updated drink
or appropriate status code indicating reason for failure
'''


'''
DELETE /drinks/<id>
where <id> is the existing model id
it should respond with a 404 error if <id> is not found
it should delete the corresponding row for <id>
it should require the 'delete:drinks' permission

returns status code 200 and json {"success": True, "delete": id}
where id is the id of the deleted record
or appropriate status code indicating reason for failure
'''

'''
error handler should conform to general task above
'''


@app.errorhandler(404)
def not_found(error):
    return jsonify({
        "success": False,
        "error": 404,
        "message": "endpoint not found"
        }), 404


@app.errorhandler(422)
def unprocessable(error):
    return jsonify({
        "success": False,
        "error": 422,
        "message": "Unprocessable Entity"
        }), 422


'''
error handler should conform to general task above
'''


@app.errorhandler(AuthError)
def auth_error(error):
    return jsonify({
        "success": False,
        "error code": error.status_code,
        "description": error.error['description']
    }), error.status_code
