import {Component, OnInit} from "@angular/core";
import {RestaurantDataService} from "../../service/Data/restuarantData.service";
import {Restaurant} from "../../Model/restaurant";
import {RestaurantManageViewModel} from "../../../ViewModel/RestaurantManageViewModel";
import {Cuisine} from "../../Model/cuisine";
import {RestaurantCuisines} from "../../Model/restaurantCuisine";
import {GenerateFormService} from "../../service/generateForm/generateForm.service";
import {RestaurantManageService} from "../../service/restaurant/RestaurantManage.service";
import {CuisineDataService} from "../../service/Data/cuisineData.service";

@Component({
  selector: "restaurant-manage",
  templateUrl: "./restaurantManage.component.html",
  styleUrls: ["/styles/common.less", "/styles/products.less", "/styles/group.less"],
  providers: [RestaurantManageService, CuisineDataService]
})

export class RestaurantManageComponent implements OnInit {

  restaurant: Restaurant = new Restaurant();
  restaurants: Restaurant[];
  cuisines: Cuisine[] = [];

  currentRestaurantCuisines: Cuisine[] = [];
  file: FileList = null;


  restaurantCuisine: RestaurantCuisines[] = [];

  isShowProducts: boolean = true;
  isShowCreate: boolean = false;
  isShowUpdate: boolean = false;

  constructor(private restaurantManageService: RestaurantManageService, private cuisineData: CuisineDataService) {
    cuisineData.url = "/api/Cuisine";
  }

  ngOnInit() {
    this.loadProducts();
    this.loadCuisines();
  }

  showUpdate(restaurant: Restaurant) {
    this.restaurant = restaurant;
    this.restaurantCuisine = restaurant.restaurantCuisines;

    for (let i = 0; i < this.restaurantCuisine.length; i++) {
      this.currentRestaurantCuisines.push(this.restaurant.restaurantCuisines[i].cuisine);
    }

    this.show(false, false, true)
  }

  showAdd() {
    this.setDefaultParameters();
    this.show(false, true, false);
  }

  loadProducts() {
    this.restaurantManageService.get().subscribe({
      next: value => {
        this.restaurants = value;
      },
      error: err => {
        alert("An error has occurred")
      }
    });
  }

  add() {
    let data = [{name: "restaurant", param: this.restaurant}, {name: "cuisines", param: this.currentRestaurantCuisines}];

    this.restaurantManageService.add(data, this.file).subscribe({
      next: value => {
        this.loadProducts();
        this.setDefaultParameters();
      },
      error: err => {
        alert("Product hasn't been added")
      }
    });
  }

  update() {
    let data = [{name: "restaurant", param: this.restaurant}, {name: "cuisines", param: this.currentRestaurantCuisines}];

    this.restaurantManageService.update(data, this.file).subscribe({
      next: value => {
        this.loadProducts();
        this.setDefaultParameters();
      },
      error: err => {
        alert("Product hasn't been updated")
      }
    });
  }

  delete(id: number) {
    let confirmToDelete: boolean = confirm("Are you sure you want to delete this item?");

    if (confirmToDelete) {
      this.restaurantManageService.delete(id).subscribe({
        next: value => {
          this.loadProducts();
          this.setDefaultParameters();
        },
        error: err => {
          alert("Product hasn't been deleted")
        }
      });
    }
  }

  addCuisine(isChecked: boolean, cuisine: Cuisine) {
    if (isChecked === true) {
      this.currentRestaurantCuisines.push(cuisine);
    } else {
      const index = RestaurantManageComponent.getIndex(cuisine, this.currentRestaurantCuisines);

      if (index > -1)
        this.currentRestaurantCuisines.splice(index, 1);
    }
  }

  setFile(files: FileList, idElement: string) {
    this.file = files;

    let reader = new FileReader();
    reader.readAsDataURL(this.file[0]);

    reader.onload = function () {
      let element = document.getElementById(idElement)
      let result = reader.result;

      element.setAttribute("src", result.toString());
    }
  }

  hasCuisine(cuisineId: number): boolean {
    for (let i = 0; i < this.restaurant.restaurantCuisines.length; i++) {
      if (cuisineId == this.restaurant.restaurantCuisines[i].cuisine.id) {
        return true;
      }
    }
    return false;
  }

  setDefaultParameters() {
    this.file = null;
    this.restaurantCuisine = [];
    this.restaurant = new Restaurant();
    this.currentRestaurantCuisines = [];
    this.show(true, false, false);
  }

  show(showProducts: boolean, showCreate: boolean, showUpdate) {
    this.isShowProducts = showProducts;
    this.isShowCreate = showCreate;
    this.isShowUpdate = showUpdate;
  }

  private loadCuisines() {
    this.cuisineData.Get().subscribe((value => this.cuisines = value));
  }

  private static getIndex(cuisines: Cuisine, cuisinesPost: Cuisine[]): number {
    for (let i = 0; i < cuisinesPost.length; i++) {
      if (cuisines.id == cuisinesPost[i].id) {
        return i;
      }
    }
    return -1;
  }
}
