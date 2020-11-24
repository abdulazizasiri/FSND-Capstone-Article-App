import os
from sqlalchemy import Column, String, Integer, create_engine
from flask_sqlalchemy import SQLAlchemy
import json

database_name = "blogdb"
database_path = "postgres://{}/{}".format('localhost:5432', database_name)

db = SQLAlchemy()

'''
setup_db(app)
    binds a flask application and a SQLAlchemy service
'''
def setup_db(app, database_path=database_path):
    app.config["SQLALCHEMY_DATABASE_URI"] = database_path
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.app = app
    db.init_app(app)
    db.create_all()

'''
Category

'''

class Category(db.Model):
  __tablename__ = 'categoriies'

  id = Column(Integer, primary_key=True)
  category_name = db.Column(String, nullable=False)
  category  = db.relationship('Article', backref='article_list', lazy=True)


  def __init__(self, category_name):
      self.category_name = category_name


  def flush(self):
      db.session.add(self)
      db.session.flush()

  def insert(self):
      db.session.add(self)
      db.session.commit()

  def update(self):
      db.session.commit()

  def delete(self):
      db.session.delete(self)
      db.session.commit()
  def rollback(self):
      db.session.rollback()
  def close(self):
      db.session.close()

  def format(self):
    return {
      'id': self.id,
      'category_name': self.category_name
    }

'''
Article

'''
class Article(db.Model):
  __tablename__ = 'articles'
  id = Column(Integer, primary_key=True)
  title = Column(String)
  category_id = Column(Integer, db.ForeignKey('categoriies.id'), nullable = False)
  content = Column(String)
  image_url = Column(String)
  likes = Column(Integer, default = 0)

  def __init__(self, title,  image_url, category_id, content, likes):
    self.title = title
    self.category_id = category_id
    self.image_url = image_url
    self.content = content
    self.likes = likes

  def insert(self):
      db.session.add(self)
      db.session.commit()

  def update(self):
      db.session.commit()

  def delete(self):
      db.session.delete(self)
      db.session.commit()

  def rollback(self):
      db.session.rollback()

  def close(self):
      db.session.close()
  def format(self):
      return {
     'id': self.id,
     'category_name': self.category_name
   }

  def format(self):
    return {
      'id': self.id,
      'image_url': self.image_url
    }
def db_drop_and_create_all():
    db.drop_all()
    db.create_all()
