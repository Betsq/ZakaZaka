﻿import { Component, OnInit} from "@angular/core";
import {RestaurantDataService} from "../service/Data/restuarantData.service";
import { Restaurant } from "../Model/restaurant";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: "restaurant-manage",
  templateUrl: "./restaurantManage.component.html",
  styleUrls: ["/styles/common.less", "/styles/products.less", "/styles/group.less"],
  providers: [RestaurantDataService]
})

export class RestaurantManageComponent implements OnInit{

  restaurant: Restaurant = new Restaurant();
  restaurants: Restaurant[];

  file: FileList = null;

  isShowProducts: boolean = true;
  isShowCreate: boolean = false;
  isShowUpdate: boolean = false;

  constructor(private dataService: RestaurantDataService ) {
    dataService.url = "/api/Restaurant";
  }

  ngOnInit(){
    this.loadProducts();
  }

  loadProducts(){
    this.dataService.Get().subscribe((data: Restaurant[]) => this.restaurants = data);
  }

  loadFile(files: FileList, idElement: string){
    this.file = files;

    let reader = new FileReader();
    reader.readAsDataURL(this.file[0]);

    reader.onload = function (){
       let element = document.getElementById(idElement)
       let result = reader.result;

       element.setAttribute("src",  result.toString());
    }
  }

  formGenerate(){
    const formDate = new FormData();

    formDate.append("restaurant", JSON.stringify(this.restaurant));

    if(this.file !== null)
      formDate.append("file", this.file[0], this.file[0].name);

    return formDate;
  }

  save(){
    const formDate = this.formGenerate();

    if(this.restaurant.id == null){
      this.dataService.Post(formDate)
        .subscribe((data: Restaurant) => this.loadProducts())
    }
    else {
      this.dataService.Put(formDate).subscribe(data => this.loadProducts())
    }
    this.cancel();
  }

  editProduct(restaurant: Restaurant){
    this.restaurant = restaurant;
    this.show(false, false, true)
  }

  cancel(){
    this.file = null;
    this.restaurant = new Restaurant();
    this.show(true, false, false);
  }

  remove(restaurant: Restaurant){
    let confirmToDelete: boolean = confirm("Are you sure you want to delete this item?");
    if(confirmToDelete)
      this.dataService.Delete(restaurant.id).subscribe(data => this.loadProducts());
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
