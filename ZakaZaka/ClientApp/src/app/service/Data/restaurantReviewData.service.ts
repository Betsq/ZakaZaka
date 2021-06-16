import {Injectable} from "@angular/core";
import {DataService} from "./Data.service";
import {HttpClient} from "@angular/common/http";

export class RestaurantReviewDataService extends DataService{
  constructor(public http: HttpClient) {
    super(http);
  }
}
