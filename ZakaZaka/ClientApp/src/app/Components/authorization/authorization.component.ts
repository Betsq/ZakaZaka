import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {UserService} from "../../service/auth/user.service";
import {UserRegistration} from "../../Model/user.registration";
import {UserLogin} from "../../Model/user.login";
import {catchError} from "rxjs/operators";
import {TokenService} from "../../service/auth/token.service";

@Component({
  selector: "authorization",
  templateUrl: "authorization.component.html",
  styleUrls: ["authorization.component.less"],
  providers: [UserService, TokenService]
})

export class AuthorizationComponent{
  loginBody: UserLogin = {};
  registerBody: UserRegistration = {};

  showErrorMessage = false;
  errorMessage: string = null;

  @Input() showSignIn: boolean = false;
  @Input() showSignUp: boolean = false;

  @Output() isUserLogin = new EventEmitter<boolean>();
  @Output() closeAuthorization = new EventEmitter();
  @Output() changeAuthorizationForm = new EventEmitter();
  constructor(private user: UserService, private token: TokenService) {
  }


  isShowPassword(element: HTMLInputElement){
    const type = element.getAttribute("type") === "password" ? "text" : "password";
    element.setAttribute("type", type);
  }

  login(){
    this.resetError();

    this.user.login(this.loginBody).subscribe({
      next: (response) => {
        localStorage.setItem("auth_token", response.auth_token);
        localStorage.setItem("firstName", response.firstName);
        this.closeForm()
        this.isUserLogin.emit(true);
      },
      error: (response) => {
        this.errorMessage = response.error.login_failure[0];
        this.showErrorMessage = true;
        this.loginBody.password = null;
      }
    });
  }

  register(){
    this.resetError();

    this.user.register(this.registerBody).subscribe({
      next: (response) =>{
        this.closeForm();
      },
      error: (response) => {

      }
    });
  }

  closeForm() : void{
    this.setDefaultParameters();
    this.closeAuthorization.emit();
  }

  changeForm() : void{
    this.setDefaultParameters();
    this.changeAuthorizationForm.emit();
  }

  private setDefaultParameters(): void{
    this.resetError();

    this.loginBody = {};
    this.registerBody = {};
  }

  private resetError() : void{
    this.showErrorMessage = false;
    this.errorMessage = null;
  }

}
