import {Injectable} from "@angular/core";
import {IRestaurantReviewService} from "./IRestaurantReview.service";
import {RestaurantReview} from "../../Model/restaurantReview";
import {RestaurantReviewDataService} from "../Data/restaurantReviewData.service";
import {GenerateFormService} from "../generateForm/generateForm.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class RestaurantReviewService implements IRestaurantReviewService{
  private data : RestaurantReviewDataService;

  constructor(public form: GenerateFormService, private http: HttpClient) {
    this.data = new RestaurantReviewDataService(http);
    this.data.url = "api/review"
  }

  get(restaurantId: number): RestaurantReview[] {
    let reviews: RestaurantReview[];

    this.data.GetWithId(restaurantId).subscribe((data: RestaurantReview[]) => reviews = data);
    return reviews;
  }

  add(restaurantReview: RestaurantReview, restaurantId: number): void {
    restaurantReview.restaurantId = restaurantId;

    let dataJson = JSON.stringify(restaurantReview)
    let headerOption = this.getHeaderOption();

    this.data.Post(dataJson, headerOption).subscribe();
  }

  update(restaurantReview: RestaurantReview): void {
    let dataJson = JSON.stringify(restaurantReview)
    let headerOption = this.getHeaderOption();

    this.data.Put(dataJson, headerOption).subscribe();
  }

  remove(reviewId: number): void {
    this.data.Delete(reviewId).subscribe();
  }

  getHeaderOption(){
    return new HttpHeaders().append("Content-Type", "application/json")
  }

}
