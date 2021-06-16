import {RestaurantCuisines} from "./restaurantCuisine";
import {RestaurantFood} from "./restaurantFood";
import {RestaurantReview} from "./restaurantReview";

export class Restaurant{
  constructor(
    public id?: number,
    public name?: string,
    public pathToImage?: string,
    public minimumOrder?: number,
    public costDelivery?: number,
    public timeToDelivery?: number,
    public payToCard?: boolean,
    public restaurantCuisines?: RestaurantCuisines[],
    public restaurantFoods?: RestaurantFood[],
    public restaurantReviews?: RestaurantReview[]
  ) {}
}
