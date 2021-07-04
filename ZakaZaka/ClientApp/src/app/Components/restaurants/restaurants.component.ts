import {Component, OnInit} from "@angular/core";
import { RestaurantDataService} from "../../service/Data/restuarantData.service";
import {Restaurant} from "../../Model/restaurant";
import {Cuisine} from "../../Model/cuisine";
import {NgxSpinnerModule, NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: "restaurants",
  templateUrl: "restaurants.component.html",
  styleUrls: ["restaurants.component.less"],
  providers: [RestaurantDataService]
})

export class RestaurantsComponent implements OnInit{
  restaurants: readonly Restaurant[];
  cuisines: readonly Cuisine[];

  constructor(private dataService: RestaurantDataService, private spinner: NgxSpinnerService) {
    dataService.url = "/api/Restaurant";
  }

  ngOnInit() {
    this.loadData()
    this.spinner.show();
  }

  loadData(){
    this.dataService.Get().subscribe({
      next: value => {
        this.setProducts(value);
        this.spinner.hide();
      }
    });
  }

  setProducts(model: Restaurant[]) : void{
    this.restaurants = model;
  }
}
