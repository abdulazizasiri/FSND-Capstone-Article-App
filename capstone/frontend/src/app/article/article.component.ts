import { Component, OnInit } from '@angular/core';
import { BlogservicesService } from '../../../services/blogservices.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  public articles = []
  public id
  constructor(public auth: AuthService, private _blogservice: BlogservicesService) { }

  ngOnInit(): void {
    this._blogservice.getArticles().subscribe(
      data => this.articles = data
    )
  }

  deleteArticle(id){
    if(confirm('Are you sure you want to save this thing into the database?')) {
      this._blogservice.deleteArticle(id).subscribe(data =>{
        console.log('Data ',data)
         this.ngOnInit()
      },
        error => console.error("Error found: ", error)
      )
} else {
  // Do nothing!
  console.log('Thing was not saved to the database.');
}


  }

}
