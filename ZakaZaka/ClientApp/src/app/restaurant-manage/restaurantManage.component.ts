﻿import { Component, OnInit} from "@angular/core";
import { RestaurantDataService } from "../service/restuarantData.service";
import { Restaurant } from "../Model/restaurant";
import { NgForm } from "@angular/forms";

@Component({
  selector: "restaurant-manage",
  templateUrl: "./restaurantManage.component.html",
  styleUrls: ["/styles/common.less", "/styles/products.less", "/styles/group.less"],
  providers: [RestaurantDataService]
})

export class RestaurantManageComponent implements OnInit{

  restaurant: Restaurant = new Restaurant();
  restaurants: Restaurant[];

  file: FileList;

  isShowProducts: boolean = true;
  isShowCreate: boolean = false;
  isShowUpdate: boolean = false;

  constructor(private dataService: RestaurantDataService) {}

  ngOnInit(){
    this.loadProducts();
  }

  loadProducts(){
    this.dataService.getRestaurants().subscribe((data: Restaurant[]) => this.restaurants = data);
  }

  loadFile(event: EventTarget){
    let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    let files: FileList = target.files;

    this.file = files;
  }

  save(){
    if(this.restaurant.id == null){

      const formDate = new FormData();
      formDate.append("restaurant", JSON.stringify(this.restaurant));
      formDate.append("file", this.file[0], this.file[0].name);

        this.dataService.createRestaurant(formDate)
          .subscribe((data: Restaurant) => this.loadProducts())
    }
    else {
      this.dataService.updateRestaurant(this.restaurant).subscribe(data => this.loadProducts())
    }
    this.cancel();
  }

  editProduct(restaurant: Restaurant){
    this.restaurant = restaurant;
    this.show(false, false, true)
  }

  cancel(){
    this.restaurant = new Restaurant();
    this.show(true, false, false);
  }

  remove(restaurant: Restaurant){
    let confirmToDelete: boolean = confirm("Are you sure you want to delete this item?");
    if(confirmToDelete)
      this.dataService.removeRestaurant(restaurant.id).subscribe(data => this.loadProducts());
  }

  add(){
    this.cancel();
    this.show(false, true, false);
  }

  show(showProducts: boolean, showCreate: boolean, showUpdate){
    this.isShowProducts = showProducts;
    this.isShowCreate = showCreate;
    this.isShowUpdate = showUpdate;
  }
}
