import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {RestaurantFood} from "../../../../Model/restaurantFood";
import {RestaurantDataShareService} from "../../../../service/restaurant/RestaurantDataShare.service";

@Component({
  selector: "restaurant-menu",
  templateUrl: "restaurantMenu.component.html",
  styleUrls: ["restaurantMenu.component.less"],
})

export class RestaurantMenuComponent implements OnInit{

  restaurantFoods: RestaurantFood[] = [];
  constructor(private shareData: RestaurantDataShareService) {
  }

  ngOnInit() {
    this.shareData.getFoods().subscribe((data: RestaurantFood[]) => this.restaurantFoods = data);
  }
}
