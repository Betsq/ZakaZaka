import {Restaurant} from "../../Model/restaurant";
import {RestaurantFood} from "../../Model/restaurantFood";
import {Observable} from "rxjs";
import {RestaurantReview} from "../../Model/restaurantReview";

export interface IRestaurantDataShareService{
  getRestaurant() : Observable<Restaurant>;
  getFoods(): Observable<RestaurantFood[]>;
  getComments() : Observable<RestaurantReview[]>

  setRestaurant(restaurant: Restaurant) : void;
  setRestaurantFoods(foods: RestaurantFood[]) : void;
  setComments(comments: RestaurantReview[]) : void
}
