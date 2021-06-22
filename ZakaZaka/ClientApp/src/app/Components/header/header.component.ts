import {Component, OnInit} from "@angular/core";
import {UserService} from "../../service/auth/user.service";
import {Observable} from "rxjs";
import {TokenService} from "../../service/auth/token.service";
import {Token} from "@angular/compiler";

@Component({
  selector: "main-header",
  templateUrl: "header.component.html",
  styleUrls: ["header.component.css"],
  providers: [TokenService]
})

export class Header implements OnInit{
  userName: string;
  userLogin: boolean = false;
  showSignIn: boolean = false;
  showSignUp: boolean = false;

  constructor(private token: TokenService) {}

   ngOnInit() {
    this.token.validate().subscribe(value => {
      this.userLogin = value;
      this.userName = localStorage.getItem("firstName");
    });
   }

  public authorization(showSignIn: boolean, showSignUp: boolean) {
    this.showSignIn = showSignIn;
    this.showSignUp = showSignUp;
  }

  public changeAuthorizationForm(){
    this.showSignIn = this.showSignIn !== true;
    this.showSignUp = this.showSignUp !== true;
  }

  public setIsLogin(isLogin: boolean){
    this.userName = localStorage.getItem("firstName")
    this.userLogin = isLogin;
  }

  logOut(){
    this.userName = "";
    this.userLogin = false;
    this.token.remove();
  }
}
