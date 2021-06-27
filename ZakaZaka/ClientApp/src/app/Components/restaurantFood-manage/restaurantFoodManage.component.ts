import {Component, OnInit} from "@angular/core";
import {RestaurantFoodDataService} from "../../service/Data/restaurantFoodData.service";
import {RestaurantFood} from "../../Model/restaurantFood";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {GenerateFormService} from "../../service/generateForm/generateForm.service";
import {RestaurantFoodService} from "../../service/restaurant/RestaurantFood.service";

@Component({
  selector: "restaurant-food-manage",
  templateUrl: "restaurantFoodManage.component.html",
  styleUrls: ["../restaurant-manage/styles/common.less", "../restaurant-manage/styles/group.less", "../restaurant-manage/styles/products.less"],
  providers: [RestaurantFoodDataService, GenerateFormService, RestaurantFoodService]
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

  constructor(private foodDataService: RestaurantFoodDataService,
              private route: ActivatedRoute,
              private form: GenerateFormService,
              private restaurantFoodService: RestaurantFoodService) {
    this.routeSubscription = route.params.subscribe(param => this.restaurantId = param["id"]);

    foodDataService.url = "/api/RestaurantFood"
  }

  ngOnInit() {
    this.loadProduct();
  }

  showAdd(){
    this.show(false, true);
  }

  showUpdate(restaurantFood: RestaurantFood){
    this.restaurantFood = restaurantFood;

    this.show(false, false, true);
  }

  loadProduct(){
    this.restaurantFoodService.get(this.restaurantId).pipe().subscribe((data: RestaurantFood[]) => this.restaurantFoods = data);
  }

  add(){
    this.restaurantFoodService.add(this.restaurantFood, this.restaurantId, this.file).subscribe({
      next: () => {
        this.loadProduct();
        this.setDefaultData();
      },
      error: () => {
        alert("Restaurant food not added")
      }
    });
  }

  update(){
    this.restaurantFoodService.update(this.restaurantFood, this.file).subscribe({
      next: () => {
        this.loadProduct();
        this.setDefaultData();
      },
      error: () =>{
        alert("Restaurant food not updated")
      }
    });
  }

  remove(restaurantFood: RestaurantFood){
    let confirmToDelete: boolean = confirm(`Are you sure you want to delete ${restaurantFood.name} ?`);

    if(confirmToDelete){
      this.restaurantFoodService.remove(restaurantFood).subscribe({
        next: () =>{
          this.loadProduct();
        },
        error: () =>{
          alert("Restaurant food not delete")
        }
      });
    }

  }

  loadFile(files: FileList, idElement: string){
    this.file = files;

    this.displayImage(idElement);
  }

  setDefaultData(){
    this.restaurantFood = new RestaurantFood();
    this.file = null;

    this.show(true)
  }

  private displayImage(idElement: string){
    let reader = new FileReader();
    reader.readAsDataURL(this.file[0]);

    reader.onload = function (){
      let element = document.getElementById(idElement)
      let result = reader.result;

      element.setAttribute("src",  result.toString());
    }
  }

  private show(showFoods: boolean = true, showCreate: boolean = false, showUpdate: boolean = false) : void{
    this.isShowFoods = showFoods;
    this.isShowCreate = showCreate;
    this.isShowUpdate = showUpdate;
  }
}
