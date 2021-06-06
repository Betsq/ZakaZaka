import {RestaurantCuisines} from "./restaurantCuisine";

export class Restaurant{
  constructor(
    public id?: number,
    public name?: string,
    public pathToImage?: string,
    public minimumOrder?: number,
    public costDelivery?: number,
    public timeToDelivery?: number,
    public payToCard?: boolean,
    public restaurantCuisines?: RestaurantCuisines[]
  ) {}
}
