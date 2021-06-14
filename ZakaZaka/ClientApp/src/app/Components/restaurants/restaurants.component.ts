import {Component, OnInit} from "@angular/core";
import { RestaurantDataService} from "../../service/Data/restuarantData.service";
import {Restaurant} from "../../Model/restaurant";
import {RestaurantManageViewModel} from "../../../ViewModel/RestaurantManageViewModel";
import {Cuisine} from "../../Model/cuisine";

@Component({
  selector: "restaurants",
  templateUrl: "restaurants.component.html",
  styleUrls: ["restaurants.component.less"],
  providers: [RestaurantDataService]
})

export class RestaurantsComponent implements OnInit{
  restaurants: readonly Restaurant[];
  cuisines: readonly Cuisine[];

  constructor(private dataService: RestaurantDataService) {
    dataService.url = "/api/Restaurant";
  }

  ngOnInit() {
    this.loadData()
  }

  loadData(){
    this.dataService.Get().subscribe((data: RestaurantManageViewModel) => this.setProducts(data));
  }

  setProducts(model: RestaurantManageViewModel) : void{
    this.restaurants = model.restaurants;
    this.cuisines = model.cuisines;
  }
}
