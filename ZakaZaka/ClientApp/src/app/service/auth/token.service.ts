import {Injectable} from "@angular/core";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})

export class TokenService{
  private urlValidate: string = "/api/auth/validateToken"

  constructor(private http: HttpClient) {}

  public validate(): Observable<boolean> {
    return this.http.get(this.urlValidate + "?token=" + this.get()).pipe(map((data: boolean) => {
      return data;
    }));
  }

  public get(){
    return localStorage.getItem("auth_token")
  }

  public remove() : void{
    localStorage.removeItem("auth_token");
  }
}
