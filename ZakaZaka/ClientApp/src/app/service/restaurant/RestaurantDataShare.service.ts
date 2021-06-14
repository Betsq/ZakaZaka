import {Injectable} from "@angular/core";
import { IRestaurantDataShareService} from "./IRestaurantDataShare.service";
import {Restaurant} from "../../Model/restaurant";
import {RestaurantFood} from "../../Model/restaurantFood";
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RestaurantDataShareService implements IRestaurantDataShareService{

  private _restaurant = new BehaviorSubject<Restaurant>(undefined);
  private _restaurantFoods = new BehaviorSubject<RestaurantFood[]>(undefined);

  constructor() {}

  public getRestaurant() : Observable<Restaurant>{
    return this._restaurant.asObservable();
  }
  public getFoods(): Observable<RestaurantFood[]>{
    return this._restaurantFoods.asObservable();
  }

  public setRestaurantFoods(foods: RestaurantFood[]) : void{
      if(foods === null || foods === undefined)
        throw new Error("Restaurant food is null or undefined")

      this._restaurantFoods.next(foods);
  }

  public setRestaurant(restaurant: Restaurant) {
    if(restaurant === null || restaurant === undefined)
      throw new Error("Restaurant is null or undefined")

    this._restaurant.next(restaurant);
  }
}
