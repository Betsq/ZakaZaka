import {Restaurant} from "../../Model/restaurant";
import {RestaurantFood} from "../../Model/restaurantFood";
import {Observable} from "rxjs";

export interface IRestaurantDataShareService{
  getRestaurant() : Observable<Restaurant>;
  getFoods(): Observable<RestaurantFood[]>;
  setRestaurantFoods(foods: RestaurantFood[]) : void;
  setRestaurant(restaurant: Restaurant) : void;
}
