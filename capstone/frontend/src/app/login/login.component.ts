import { Component, OnInit } from '@angular/core';
import { BlogservicesService } from '../../../services/blogservices.service';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login = "Login"
  logout = "Logout"
  public isLoggedIn = true
  loginURL: string
  public token = ""
  constructor(private route: ActivatedRoute,  public auth: AuthService){
  // this.loginURL = auth.build_login_link('/login')
  this.loginURL = auth.build_login_link('/login');

  console.log("Auth URL: "+this.loginURL)

  // if (this.route.snapshot.fragment) {
  //   console.log("Logeed in")
  //   this.loginUser()
  //   this.isLoggedIn = false
  // }
  // this.token = this.route

  // this.token =

  }


  loginUser(){
    var tk = this.auth.activeJWT()
    console.log("Token found is "+tk)
    console.log("Login user")

  }




  ngOnInit(): void {

    this.token = this.route.snapshot.fragment

    // console.log( this.route.snapshot.fragment.slice(13,-35))
  }
  logoutUser(){
    console.log("Loged out")
    // this.auth.logout()
    this.auth.logout()
  }


  ngDoCheck(): void {

  }

}
