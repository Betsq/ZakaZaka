import {Component, OnInit} from "@angular/core";
import { RestaurantDataService} from "../service/restuarantData.service";
import {Restaurant} from "../Model/restaurant";

@Component({
  selector: "restaurants",
  templateUrl: "restaurants.component.html",
  styleUrls: ["restaurants.component.less"],
  providers: [RestaurantDataService]
})

export class RestaurantsComponent implements OnInit{
  restaurants: Restaurant[];
  constructor(private dataService: RestaurantDataService) {}

  ngOnInit() {
    this.loadRestaurants()
  }

  loadRestaurants(){
    this.dataService.getRestaurants().subscribe((data: Restaurant[]) => this.restaurants = data);
  }
}
