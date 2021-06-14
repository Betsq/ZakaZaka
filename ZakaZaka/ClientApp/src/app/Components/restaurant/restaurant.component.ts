import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {Restaurant} from "../../Model/restaurant";
import {RestaurantDataService} from "../../service/Data/restuarantData.service";
import {RestaurantDataShareService} from "../../service/restaurant/RestaurantDataShare.service";

@Component({
  selector: "restaurant",
  templateUrl: "restaurant.component.html",
  styleUrls: ["restaurant.component.less"],
  providers: [RestaurantDataService]
})


export class RestaurantComponent implements OnInit{
  id: number;
  restaurant: Restaurant;

  private routeSubscription: Subscription;

  constructor(private route: ActivatedRoute, private dataService: RestaurantDataService, private shareData: RestaurantDataShareService) {
    this.routeSubscription = route.params.subscribe(param => this.id = param["id"]);
  }

  ngOnInit() {
    this.dataService.url = "/api/Restaurant";
    this.dataService.GetWithId(this.id).subscribe((data: Restaurant) => this.setRestaurant(data));
  }

  private setRestaurant(restaurant: Restaurant) : void{
    this.restaurant = restaurant;
    this.shareData.setRestaurantFoods(restaurant.restaurantFoods);
    this.shareData.setRestaurant(restaurant);
  }
}
