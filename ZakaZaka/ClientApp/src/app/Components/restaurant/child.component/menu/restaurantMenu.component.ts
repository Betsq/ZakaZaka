import {Component, OnInit} from "@angular/core";
import {RestaurantFood} from "../../../../Model/restaurantFood";
import {RestaurantDataShareService} from "../../../../service/restaurant/RestaurantDataShare.service";
import {ProductInBasket} from "../../../../Model/ProductInBasket";
import {BasketService} from "../../../../service/Basket.service";

@Component({
  selector: "restaurant-menu",
  templateUrl: "restaurantMenu.component.html",
  styleUrls: ["restaurantMenu.component.less"],
})

export class RestaurantMenuComponent implements OnInit{

  restaurantFoods: RestaurantFood[] = [];
  constructor(private shareData: RestaurantDataShareService, private basket: BasketService) {
  }

  ngOnInit() {
    this.shareData.getFoods().subscribe((data: RestaurantFood[]) => this.restaurantFoods = data);
  }

  public addToBasket(foodId: number, rstId: number, price: number) {
    let product: ProductInBasket = {restaurantId: rstId, productId: foodId, productCount: 1, productPrice: price}

    this.basket.addToBasket(product);
  }
}
