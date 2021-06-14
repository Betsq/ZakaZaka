import {Component, Input} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {RestaurantFood} from "../../../../Model/restaurantFood";

@Component({
  selector: "restaurant-menu",
  templateUrl: "restaurantMenu.component.html",
  styleUrls: ["restaurantMenu.component.less"]
})

export class RestaurantMenuComponent{

  @Input() restaurantFoods: RestaurantFood[] = [];
  constructor() {
  }

}
