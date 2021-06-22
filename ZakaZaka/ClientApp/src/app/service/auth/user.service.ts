import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {UserRegistration} from "../../Model/user.registration";
import {UserLogin} from "../../Model/user.login";
import {TokenService} from "./token.service";

@Injectable()

export class UserService{
  private urlLogin: string = "/api/auth/login"
  private urlRegister: string = "/api/account"

  constructor(private http: HttpClient, private token: TokenService) {}

  register(body: UserRegistration) : Observable<UserRegistration>{
    let bodyJSON = JSON.stringify(body);

    return this.http.post<UserRegistration>(this.urlRegister, bodyJSON, {headers: new HttpHeaders({"Content-Type": "application/json"})});
  }

  login(body: UserLogin) : Observable<any>{
    let bodyJSON = JSON.stringify(body)

    return this.http.post(this.urlLogin, bodyJSON, {headers: new HttpHeaders({"Content-Type": "application/json"})});
  }
}
