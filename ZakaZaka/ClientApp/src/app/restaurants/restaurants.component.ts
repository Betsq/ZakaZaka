import {Component, OnInit} from "@angular/core";
import { RestaurantDataService} from "../service/Data/restuarantData.service";
import {Restaurant} from "../Model/restaurant";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: "restaurants",
  templateUrl: "restaurants.component.html",
  styleUrls: ["restaurants.component.less"],
  providers: [RestaurantDataService]
})

export class RestaurantsComponent implements OnInit{
  restaurants: Restaurant[];

  constructor(private dataService: RestaurantDataService) {
    dataService.url = "/api/Restaurant";
  }

  ngOnInit() {
    this.loadRestaurants()
  }

  loadRestaurants(){
    this.dataService.Get().subscribe((data: Restaurant[]) => this.restaurants = data);
  }
}
