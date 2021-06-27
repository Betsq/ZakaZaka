import {Injectable} from "@angular/core";
import {DataService} from "./Data.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class RestaurantFoodDataService extends DataService{
  constructor(http: HttpClient) {
    super(http);
  }

  Post(form: FormData) : Observable<any>{
    const headers = new HttpHeaders().append("Content-Disposition", "multipart/form-data");
    return this.http.post(this.url, form, {headers: headers});
  }

  Put(form: FormData) : Observable<any>{
    const headers = new HttpHeaders().append("Content-Disposition", "multipart/form-data");
    return this.http.put(this.url, form, {headers: headers});
  }
}
