import { Component, OnInit} from "@angular/core";
import { RestaurantDataService} from "../service/restuarantData.service";
import { Restaurant} from "../Model/restaurant";

@Component({
  selector: "restaurant-manage",
  templateUrl: "/restaurantManage.component.html",
  styleUrls: ["/styles/common.less", "/styles/products.less", "/styles/group.less"],
  providers: [RestaurantDataService]
})

export class RestaurantManageComponent{
  private restaurant: Restaurant = new Restaurant();
  private restaurants: Restaurant[];
  private tableMode: boolean = true;

  constructor(private dataService: RestaurantDataService) {}

  ngOnInit(){
    this.loadProducts();
  }


  loadProducts(){
    this.dataService.getRestaurants().subscribe((data: Restaurant[]) => this.restaurants = data);
  }

  save(){
    if(this.restaurant.id == null){
      this.dataService.createRestaurant(this.restaurant)
        .subscribe((data: Restaurant) => this.restaurants.push(data))
    }
    else {
      this.dataService.updateRestaurant(this.restaurant).subscribe(data => this.loadProducts())
    }
    this.cancel();
  }

  editProduct(restaurant: Restaurant){
    this.restaurant = restaurant;
  }

  cancel(){
    this.restaurant = new Restaurant();
    this.tableMode = true;
  }

  remove(restaurant: Restaurant){
    this.dataService.removeRestaurant(restaurant.id).subscribe(data => this.loadProducts());
  }

  add(){
    this.cancel();
    this.tableMode = false;
  }
}
