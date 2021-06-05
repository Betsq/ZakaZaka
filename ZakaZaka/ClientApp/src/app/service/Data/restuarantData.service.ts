import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Restaurant } from "../../Model/restaurant";
import {DataService} from "./Data.service";

@Injectable()
export class RestaurantDataService extends DataService{

  constructor(protected http: HttpClient) {
    super(http);
  }

  Post(form: FormData){
    const headers = new HttpHeaders().append("Content-Disposition", "multipart/form-data");
    return this.http.post(this.url, form, {headers: headers});
  }

  Put(form: FormData){
    const headers = new HttpHeaders().append("Content-Disposition", "multipart/form-data");
    return this.http.put(this.url, form, {headers: headers});
  }
}
