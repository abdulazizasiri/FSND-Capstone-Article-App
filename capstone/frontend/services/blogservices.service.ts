import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../src/environments/environment';
import {CategoryI } from './model/category' ;
import { Observable } from 'rxjs/Observable';
import {ArticleModel} from '../src/app/article-model'
import {ArticleModelUpdate} from '../src/app/article-model-update'
@Injectable({
  providedIn: 'root'
})
export class BlogservicesService {

  constructor(private auth: AuthService, private http: HttpClient) { }

getHeaders() {
  const header = {
    headers: new HttpHeaders()
      .set('Authorization',  `Bearer ${this.auth.activeJWT()}`)
  };
  return header;
}

  getArticles(): Observable<CategoryI[]>{
      return this.http.get<CategoryI[]>('http://localhost:5000/articles', this.getHeaders())
  }

  getCategories(): Observable<CategoryI[]>{
    return this.http.get<CategoryI[]>('http://localhost:5000/categories', this.getHeaders())
  }

  getSpecificArticle(id) {
    console.log("id passed is "+id)
    return this.http.get(`http://localhost:5000/articles/${id}`, this.getHeaders())
  }

  postArticle(article:ArticleModel ) {
    console.log("Posting it  is ")
    return this.http.post<any>('http://localhost:5000/articles',article, this.getHeaders())
  }

  patchanArticle(article:ArticleModelUpdate) {
    console.log("Called API "+article.id)
    return this.http.patch<ArticleModelUpdate>(`http://localhost:5000/articles/${article.id}`, article, this.getHeaders())
  }
  deleteArticle(id) {
      return this.http.delete(`http://localhost:5000/articles/${id}`, this.getHeaders())
  }
}
