import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpRequest} from "@angular/common/http";
import  { Restaurant} from "../Model/restaurant";
import {NgForm} from "@angular/forms";

@Injectable()
export class RestaurantDataService{
  private url = "/api/Restaurant";

  constructor(private http: HttpClient) {}

  getRestaurants(){
    return this.http.get(this.url);
  }

  getRestaurant(id: number){
    return this.http.get(this.url + "/" + id)
  }

  createRestaurant(form: FormData){
    const headers = new HttpHeaders().append("Content-Disposition", "multipart/form-data");
    return this.http.post(this.url, form, {headers: headers});
  }

  updateRestaurant(form: FormData){
    const headers = new HttpHeaders().append("Content-Disposition", "multipart/form-data");
    return this.http.put(this.url, form, {headers: headers});
  }

  removeRestaurant(id: number){
    return this.http.delete(this.url + "/" + id)
  }
}
