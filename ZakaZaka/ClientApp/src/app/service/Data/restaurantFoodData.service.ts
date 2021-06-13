import {Injectable} from "@angular/core";
import {DataService} from "./Data.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class RestaurantFoodManageDataService extends DataService{
  constructor(http: HttpClient) {
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
