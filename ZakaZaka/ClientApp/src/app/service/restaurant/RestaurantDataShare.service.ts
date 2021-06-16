import {Injectable} from "@angular/core";
import { IRestaurantDataShareService} from "./IRestaurantDataShare.service";
import {Restaurant} from "../../Model/restaurant";
import {RestaurantFood} from "../../Model/restaurantFood";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {RestaurantReview} from "../../Model/restaurantReview";

@Injectable({
  providedIn: 'root'
})
export class RestaurantDataShareService implements IRestaurantDataShareService{

  private _restaurant = new BehaviorSubject<Restaurant>(undefined);
  private _restaurantFoods = new BehaviorSubject<RestaurantFood[]>(undefined);
  private _restaurantViews = new BehaviorSubject<RestaurantReview[]>(undefined);

  constructor() {}

  public getRestaurant() : Observable<Restaurant>{
    return this._restaurant.asObservable();
  }
  public getFoods(): Observable<RestaurantFood[]>{
    return this._restaurantFoods.asObservable();
  }
  public getComments(): Observable<RestaurantReview[]> {
    return this._restaurantViews.asObservable();
  }

  public setRestaurantFoods(foods: RestaurantFood[]) : void{
      this._restaurantFoods.next(foods);
  }

  public setRestaurant(restaurant: Restaurant) {
    this._restaurant.next(restaurant);
  }

  public setComments(comments: RestaurantReview[]): void {
    this._restaurantViews.next(comments);
  }
}
