import {Component} from "@angular/core";

@Component({
  selector: "main-header",
  templateUrl: "header.component.html",
  styleUrls: ["header.component.css"],
})

export class Header {
  showSignIn: boolean = false;
  showSignUp: boolean = false;

  public authorization(showSignIn: boolean, showSignUp: boolean) {
    this.showSignIn = showSignIn;
    this.showSignUp = showSignUp;
  }

  public changeAuthorizationForm(){
    this.showSignIn = this.showSignIn !== true;
    this.showSignUp = this.showSignUp !== true;

  }
}
