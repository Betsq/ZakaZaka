import {Injectable} from "@angular/core";
import {IRestaurantReviewService} from "./IRestaurantReview.service";
import { RestaurantReview} from "../../Model/restaurantReview";
import {RestaurantReviewDataService} from "../Data/restaurantReviewData.service";
import {GenerateFormService} from "../generateForm/generateForm.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class RestaurantReviewService implements IRestaurantReviewService{
  private data : RestaurantReviewDataService;

  constructor(public form: GenerateFormService, private http: HttpClient) {
    this.data = new RestaurantReviewDataService(http);
    this.data.url = "api/review"
  }

  add(restaurantReview: RestaurantReview, restaurantId: number): void {
    restaurantReview.restaurantId = restaurantId;

    let review = [{name: "restaurantReview", param: restaurantReview}];
    let form = this.form.generate(review);

    this.data.Post(form).subscribe();
  }

  get(restaurantId: number): RestaurantReview[] {
    let reviews: RestaurantReview[];

    this.data.GetWithId(restaurantId).subscribe((data: RestaurantReview[]) => reviews = data);
    return reviews;
  }

  remove(reviewId: number): void {
    this.data.Delete(reviewId).subscribe();
  }

  update(restaurantReview: RestaurantReview): void {
    let review = [{name: "restaurantReview", param: restaurantReview}];
    let form = this.form.generate(review);

    this.data.Put(form).subscribe();
  }

}
