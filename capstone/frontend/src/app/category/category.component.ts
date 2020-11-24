import { Component, OnInit } from '@angular/core';
import { BlogservicesService } from '../../../services/blogservices.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  public categories = []
  constructor(private _blogservice: BlogservicesService) { }

  ngOnInit(): void {
    this._blogservice.getCategories().subscribe(

      data => this.categories = data
    )
  }

}
