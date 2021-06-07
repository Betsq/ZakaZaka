import { Component, OnInit} from "@angular/core";
import {RestaurantDataService} from "../service/Data/restuarantData.service";
import { Restaurant } from "../Model/restaurant";
import {RestaurantManageViewModel} from "../../ViewModel/RestaurantManageViewModel";
import {Cuisine} from "../Model/cuisine";
import {RestaurantCuisines} from "../Model/restaurantCuisine";

@Component({
  selector: "restaurant-manage",
  templateUrl: "./restaurantManage.component.html",
  styleUrls: ["/styles/common.less", "/styles/products.less", "/styles/group.less"],
  providers: [RestaurantDataService]
})

export class RestaurantManageComponent implements OnInit{

  restaurant: Restaurant = new Restaurant();
  restaurants: Restaurant[];
  cuisines: Cuisine[] = [];

  cuisinesPost: Cuisine[] = [];
  file: FileList = null;


  restaurantCuisine: RestaurantCuisines[] = [];

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
    this.dataService.Get().subscribe((data: RestaurantManageViewModel) => this.setProducts(data));
  }

  setProducts(model: RestaurantManageViewModel){
    this.restaurants = model.restaurants;
    this.cuisines = model.cuisines;
  }

  addCuisine(item: boolean, cuisine: Cuisine){
    console.log(this.cuisinesPost);
    if(item === true){
      this.cuisinesPost.push(cuisine);
    }
    else{
      const index = this.getIndex(cuisine, this.cuisinesPost);

      if(index > -1)
        this.cuisinesPost.splice(index, 1);
    }
  }

  private getIndex(cuisines: Cuisine, cuisinesPost: Cuisine[]): number{
    for(let i = 0; i < cuisinesPost.length; i++){
      if(cuisines.id == cuisinesPost[i].id){
        return i;
      }
    }
    return -1;
  }

  save(){
    const formDate = this.formGenerate();

    if(this.restaurant.id == null){
      this.dataService.Post(formDate).subscribe((data: Restaurant) => this.loadProducts());
    }
    else{
      this.dataService.Put(formDate).subscribe(() => this.loadProducts())
    }

    this.cancel();
  }

  update(restaurant: Restaurant){
    this.restaurant = restaurant;
    this.restaurantCuisine = restaurant.restaurantCuisines;

    for(let i = 0; i < this.restaurantCuisine.length; i++){
      this.cuisinesPost.push(this.restaurant.restaurantCuisines[i].cuisine);
    }

    this.show(false, false, true)
  }

  cancel(){
    this.file = null;
    this.restaurantCuisine = [];
    this.restaurant = new Restaurant();
    this.cuisinesPost = [];
    this.show(true, false, false);
  }

  remove(restaurant: Restaurant){
    let confirmToDelete: boolean = confirm("Are you sure you want to delete this item?");

    if(confirmToDelete)
      this.dataService.Delete(restaurant.id).subscribe(() => this.loadProducts());
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

    this.restaurant.restaurantCuisines = this.restaurantCuisine;

    formDate.append("restaurant", JSON.stringify(this.restaurant));

    if(this.file !== null)
      formDate.append("file", this.file[0], this.file[0].name);

    if(this.cuisinesPost.length > 0)
      formDate.append("cuisines", JSON.stringify(this.cuisinesPost));

    return formDate;
  }

  hasCuisine(cuisineId: number) : boolean{
    for(let i = 0; i < this.restaurant.restaurantCuisines.length; i++){
      if(cuisineId == this.restaurant.restaurantCuisines[i].cuisine.id){
        return true;
      }
    }
    return false;
  }


}
