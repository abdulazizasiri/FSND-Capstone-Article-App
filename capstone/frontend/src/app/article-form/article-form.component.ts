import { Component, OnInit, Input } from '@angular/core';
import {ArticleModel} from '../article-model';
import { BlogservicesService } from '../../../services/blogservices.service';
import {ArticleModelUpdate} from '../article-model-update';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})

export class ArticleFormComponent {

  public articleModel ;
  @Input() isupdated ;

  @Input() updatedArticle
  public model: ArticleModelUpdate
  constructor(  private _blogservice: BlogservicesService){
     this.articleModel =  new ArticleModelUpdate(-1,"","","","",0)
  }

  updateArticle() {
    console.log("updating ")
    this._blogservice.patchanArticle(this.articleModel).subscribe(data =>{
      console.log('Data ',data)
    },
      error => console.error('Error', error)
    )

  }

  onSubmiit(){
  // Call the method.\
  console.log("what is going on")
  this._blogservice.postArticle(this.articleModel).subscribe(data =>{
    console.log('Data ',data)
  },
    error => console.error('Error found ', error)
  )

  }

  ngOnInit(): void {
    if (this.isupdated){
      // console.log(this.updatedArticle)
      this.articleModel = new ArticleModelUpdate(this.updatedArticle.article.id,this.updatedArticle.article.title,this.updatedArticle.article.image,this.updatedArticle.article.category,this.updatedArticle.article.contet,this.updatedArticle.article.likes)
      console.log("This is true ")
    }

  }





}
