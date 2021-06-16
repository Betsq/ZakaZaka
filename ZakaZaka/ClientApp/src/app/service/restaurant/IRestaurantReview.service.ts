import {RestaurantReview} from "../../Model/restaurantReview";

export interface IRestaurantReviewService{
  get(restaurantId: number) : RestaurantReview[];
  add(restaurantReview: RestaurantReview, restaurantId: number) : void;
  update(restaurantReview: RestaurantReview) : void;
  remove(reviewId: number) : void;
}
