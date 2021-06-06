import {Restaurant} from "./restaurant";
import {Cuisine} from "./cuisine";

export class RestaurantCuisines{
  constructor(
    public id?: number,
    public restaurantId?: number,
    public cuisineId?: number,
    public cuisine?: Cuisine
  ) {}
}
