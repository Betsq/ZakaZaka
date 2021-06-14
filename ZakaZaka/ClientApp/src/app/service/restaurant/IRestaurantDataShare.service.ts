import {Restaurant} from "../../Model/restaurant";
import {RestaurantFood} from "../../Model/restaurantFood";

export interface IRestaurantDataService{
  getRestaurants() : Restaurant[];
  getFoods(): RestaurantFood[];
}
