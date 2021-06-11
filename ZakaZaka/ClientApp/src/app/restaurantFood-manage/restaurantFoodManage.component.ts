import {Component, OnInit} from "@angular/core";
import {RestaurantFoodManageDataService} from "../service/Data/restaurantFoodManageData.service";
import {Restaurant} from "../Model/restaurant";
import {RestaurantFood} from "../Model/restaurantFood";

@Component({
  selector: "restaurant-food-manage",
  templateUrl: "restaurantFoodManage.component.html",
  styleUrls: ["../restaurant-manage/styles/common.less", "../restaurant-manage/styles/group.less", "../restaurant-manage/styles/products.less"],
  providers: [RestaurantFoodManageDataService]
})

export class RestaurantFoodManageComponent implements OnInit{

  restaurants: Restaurant[] = [];
  restaurantFoods: RestaurantFood[] = [];

  restaurantFood: RestaurantFood = new RestaurantFood();
  restaurant: Restaurant = new Restaurant();

  file: FileList = null;

  restaurantId: number;
  isShowProducts: boolean = true;
  isShowRestaurantFood: boolean = false;
  isShowCreate: boolean = false;
  isShowUpdate: boolean = false;

  constructor(private dataService: RestaurantFoodManageDataService) {
    dataService.url = "/api/RestaurantFood"
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(){
    this.dataService.Get().subscribe((data: Restaurant[]) => this.restaurants = data);
  }

  loadProduct(){
    this.dataService.GetWithId(this.restaurant.id).subscribe((data: Restaurant) => this.loadFoods(data));
  }

  loadFoods(restaurant: Restaurant){
    this.restaurantFoods = restaurant.restaurantFoods;
    this.restaurant = restaurant;

    this.show(false, false, false, true)
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

  add(){
    this.show(false, true);
  }

  update(restaurantFood: RestaurantFood){
    this.restaurantFood = restaurantFood;

    this.show(false, false, true, false);
  }

  remove(restaurantFood: RestaurantFood){
    let confirmToDelete: boolean = confirm(`Are you sure you want to delete ${restaurantFood.name} ?`);

    if(confirmToDelete)
      this.dataService.Delete(restaurantFood.id).subscribe(() => this.loadProduct());
  }

  save(){
    const formData = this.formData();

    if(this.restaurantFood.id === null){
      this.dataService.Post(formData).subscribe(() => this.loadProduct());
    }
    else{
      this.dataService.Put(formData).subscribe(() => this.loadProduct());
    }

    this.backToRestaurant();
  }

  formData(){
    const formDate = new FormData();

    formDate.append("restaurantFood", JSON.stringify(this.restaurantFood));
    formDate.append("restaurantId", JSON.stringify(this.restaurant.id));

    if(this.file !== null)
      formDate.append("file", this.file[0], this.file[0].name);

    return formDate;
  }

  backToRestaurant(){
    this.show(false, false, false, true);
    this.restaurantFood = new RestaurantFood();
    this.file = null;
  }


  cancel(){
    this.restaurantFoods = [];
    this.restaurantFood = new RestaurantFood();
    this.restaurant = new Restaurant();
    this.file = null;

    this.show()
  }

  show(showProducts: boolean = true, showCreate: boolean = false, showUpdate: boolean = false,
       showRestaurantFood: boolean = false) : void{
    this.isShowProducts = showProducts;
    this.isShowRestaurantFood = showRestaurantFood
    this.isShowCreate = showCreate;
    this.isShowUpdate = showUpdate;
  }
}
