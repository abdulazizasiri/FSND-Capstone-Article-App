import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit{
  public formUrl = "form-publish"
  public myclass = ""
 public isLoggedIn
 public disable = {

  color: "gray",
  cursor: "not-allowed",
  opacity: 0.5,
  textDecoration: "none"

 }

constructor(public auth: AuthService) {
  // this.loginURL = auth.build_login_link('/login')
  // console.log("login url is: "+this.loginURL)




 }


 ngOnInit(): void {
   this.auth.load_jwts();
   this.auth.check_token_fragment();
   // if (!this.auth.toke){
   //   this.isLoggedIn = true
   //   console.log("logged in")
   // }
   // if (this.auth.token) {
   //   console.log("Logged out")
   //   this.isLoggedIn  = false
   // }

 }


postArticle(){

  console.log("Yes")

  // return true;
}


}
