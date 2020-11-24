import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component'
import {HeaderComponent} from './header/header.component'
import {ArticleFormComponent} from './article-form/article-form.component'
// import {CardComponent} from './card/card.component'
import {ArticleComponent} from './article/article.component'
import {CategoryComponent} from './category/category.component'
import {ArtiicleColumnComponent} from './artiicle-column/artiicle-column.component'
import {PageNotFoundComponent} from './page-not-found/page-not-found.component'


const routes: Routes = [
  {path: 'login', component:LoginComponent},
    {path: 'articles/:id', component:ArtiicleColumnComponent } ,
  {path: 'articles', component:ArticleComponent } ,
  {path: 'form-publish', component:ArticleFormComponent},
  {path: 'categories', component:CategoryComponent},
  {path: '**', component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
