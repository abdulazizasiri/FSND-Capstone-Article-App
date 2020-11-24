import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BlogservicesService } from '../../services/blogservices.service';
import { AuthService } from '../../services/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
// import { CardComponent } from './card/card.component';
import { ArticleFormComponent } from './article-form/article-form.component';
import { ArticleComponent } from './article/article.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {FormsModule} from '@angular/forms';
import { CategoryComponent } from './category/category.component';
import { ArtiicleColumnComponent } from './artiicle-column/artiicle-column.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LoginComponent,
    // CardComponent,
    ArticleFormComponent,
    ArticleComponent,
    PageNotFoundComponent,
    CategoryComponent,
    ArtiicleColumnComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthService, BlogservicesService],
  bootstrap: [HeaderComponent]
})
export class AppModule { }
