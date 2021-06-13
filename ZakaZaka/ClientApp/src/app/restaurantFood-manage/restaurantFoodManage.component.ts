import {Component, OnInit} from "@angular/core";
import {RestaurantFoodDataService} from "../service/Data/restaurantFoodData.service";
import {Restaurant} from "../Model/restaurant";
import {RestaurantFood} from "../Model/restaurantFood";
import {RestaurantDataService} from "../service/Data/restuarantData.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: "restaurant-food-manage",
  templateUrl: "restaurantFoodManage.component.html",
  styleUrls: ["../restaurant-manage/styles/common.less", "../restaurant-manage/styles/group.less", "../restaurant-manage/styles/products.less"],
  providers: [RestaurantFoodDataService, RestaurantDataService]
})

export class RestaurantFoodManageComponent implements OnInit{

  restaurantFoods: RestaurantFood[] = [];
  restaurantFood: RestaurantFood = new RestaurantFood();

  file: FileList = null;

  restaurantId: number;

  isShowFoods: boolean = true;
  isShowCreate: boolean = false;
  isShowUpdate: boolean = false;

  routeSubscription: Subscription;

  constructor(private foodDataService: RestaurantFoodDataService, private route: ActivatedRoute) {
    this.routeSubscription = route.params.subscribe(param => this.restaurantId = param["id"]);

    foodDataService.url = "/api/RestaurantFood"
  }

  ngOnInit() {
    this.loadProduct();
  }

  loadProduct(){
    this.foodDataService.GetWithId(this.restaurantId).subscribe((data: RestaurantFood[]) => this.restaurantFoods = data);
    console.log(this.restaurantId);
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

    this.show(false, false, true);
  }

  remove(restaurantFood: RestaurantFood){
    let confirmToDelete: boolean = confirm(`Are you sure you want to delete ${restaurantFood.name} ?`);

    if(confirmToDelete)
      this.foodDataService.Delete(restaurantFood.id).subscribe(() => this.loadProduct());
  }

  save(){
    const formData = this.formData();

    if(this.restaurantFood.id === null){
      this.foodDataService.Post(formData).subscribe(() => this.loadProduct());
    }
    else{
      this.foodDataService.Put(formData).subscribe(() => this.loadProduct());
    }

    this.cancel();
  }

  formData(){
    const formDate = new FormData();

    formDate.append("restaurantFood", JSON.stringify(this.restaurantFood));
    formDate.append("restaurantId", JSON.stringify(this.restaurantId));

    if(this.file !== null)
      formDate.append("file", this.file[0], this.file[0].name);

    return formDate;
  }

  cancel(){
    this.restaurantFood = new RestaurantFood();
    this.file = null;

    this.show(true)
  }

  show(showFoods: boolean = true, showCreate: boolean = false, showUpdate: boolean = false) : void{
    this.isShowFoods = showFoods;
    this.isShowCreate = showCreate;
    this.isShowUpdate = showUpdate;
  }
}
