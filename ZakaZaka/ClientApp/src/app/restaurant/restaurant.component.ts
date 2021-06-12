import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {Restaurant} from "../Model/restaurant";
import {RestaurantDataService} from "../service/Data/restuarantData.service";

@Component({
  selector: "restaurant",
  templateUrl: "restaurant.component.html",
  styleUrls: ["restaurant.component.less"],
  providers: [RestaurantDataService]
})

export class RestaurantComponent{
  id: number;
  restaurant: Restaurant;

  private routeSubscription: Subscription;

  constructor(private route: ActivatedRoute, private dataService: RestaurantDataService) {
    this.routeSubscription = route.params.subscribe(param => this.id = param["id"]);
    dataService.url = "/api/Restaurant";
    this.loadProduct();
  }

  loadProduct(){
    this.dataService.GetWithId(this.id).subscribe((data: Restaurant) => this.restaurant = data)
  }
}
