import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import  { Restaurant} from "../Model/restaurant";

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

  createRestaurant(restaurant: Restaurant){
    return this.http.post(this.url, restaurant)
  }

  updateRestaurant(restaurant: Restaurant){
    return this.http.put(this.url, restaurant)
  }

  removeRestaurant(id: number){
    return this.http.delete(this.url + "/" + id)
  }
}
