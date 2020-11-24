import { Component, OnInit } from '@angular/core';
import { BlogservicesService } from '../../../services/blogservices.service';
import { ActivatedRoute } from '@angular/router';
import {ArticleFormComponent} from '../article-form/article-form.component'
import {ArticleModelUpdate} from '../article-model-update';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-artiicle-column',
  templateUrl: './artiicle-column.component.html',
  styleUrls: ['./artiicle-column.component.css']
})
export class ArtiicleColumnComponent implements OnInit {
  public article = {}
  public article_object
  public passedId
  public is_updated = false

  constructor(public auth: AuthService , private route: ActivatedRoute,   private _blogservice: BlogservicesService) {

  }

  incrementLikes() {
    console.log("INCREMENTING")
    this.article_object.article.likes += 1
    console.log("id passed is "+this.article_object.article.id)
    console.log("Article changed: "+this.article_object.article.likes)
    this._blogservice.patchanArticle(this.article_object.article).subscribe(
      data => console.log('Data ',data),
      error => console.error('Error', error)
    )

  }

  editArticle(articleObject){
    this.is_updated = true
    // var temp = new ArticleFormComponent()
    // temp.is_for_update = true
    // temp.articleModel = articleObject
    // // var updateObject = new ArticleModelUpdate(articleObject.id, articleObject.title, articleObject.image_url, articleObject.category, articleObject.article )
    // alert(temp.articleModel.id)
  }

  ngOnInit(): void {


  this.article_object = this.route.url
  console.log("URL "+  Number(this.article_object._value[1].path))
  // var num = (this.route.url._value[1].path)
  // console.log("Active Route "+typeof num)
  //
  this._blogservice.getSpecificArticle( Number(this.article_object._value[1].path)).subscribe(

    data => this.article_object = data
  )
  }

}
