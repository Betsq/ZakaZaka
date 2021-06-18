import {Component,EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: "authorization",
  templateUrl: "authorization.component.html",
  styleUrls: ["authorization.component.less"],
})

export class AuthorizationComponent{
  @Input() showSignIn: boolean = false;
  @Input() showSignUp: boolean = false;

  @Output() closeAuthorization = new EventEmitter();
  @Output() changeAuthorizationForm = new EventEmitter();

  isShowPassword(element: HTMLInputElement){
    const type = element.getAttribute("type") === "password" ? "text" : "password";
    element.setAttribute("type", type);
  }
}
