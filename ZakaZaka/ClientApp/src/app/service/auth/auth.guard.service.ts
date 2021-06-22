import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {TokenService} from "./token.service";

@Injectable()
export class AuthGuardService implements CanActivate{
  constructor(private token: TokenService) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{
    return this.token.validate();
  }
}
