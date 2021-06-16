import {Component, OnInit} from "@angular/core";
import {RestaurantDataShareService} from "../../../../service/restaurant/RestaurantDataShare.service";
import {RestaurantReviewService} from "../../../../service/restaurant/RestaurantReview.service";
import {RestaurantReview} from "../../../../Model/restaurantReview";
import {Restaurant} from "../../../../Model/restaurant";

@Component({
  selector: "restaurant-reviews",
  templateUrl: "restaurantReview.component.html",
  styleUrls: ["restaurantReview.component.less"],
  providers: [RestaurantReviewService]
})

export class RestaurantReviewComponent implements OnInit{
  reviews: RestaurantReview[] = [];

  reviewPost: RestaurantReview = new RestaurantReview();
  restaurant: Restaurant;

  constructor(private shareData: RestaurantDataShareService, private restaurantReview: RestaurantReviewService)  {
  }

  ngOnInit() {
    this.shareData.getComments().subscribe((data: RestaurantReview[]) => this.reviews = data);
    this.shareData.getRestaurant().subscribe((data: Restaurant) => this.restaurant = data);
  }

  public add(textareaElem: any){
    textareaElem.value = "";

    //This is temporary
    this.reviewPost.assessment = 4;
    this.restaurantReview.add(this.reviewPost, this.restaurant.id);

    this.loadReviews();
  }

  public loadReviews(){
    this.reviews = this.restaurantReview.get(this.restaurant.id);
  }
}
