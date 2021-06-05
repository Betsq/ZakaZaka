import {Component, OnInit} from "@angular/core";
import { CuisineDataService } from "../service/Data/cuisineData.service";
import { Cuisine} from "../Model/cuisine";
import {Restaurant} from "../Model/restaurant";

@Component({
  selector: "cuisine",
  templateUrl: "cuisineManage.component.html",
  styleUrls: ["../restaurant-manage/styles/common.less","../restaurant-manage/styles/products.less", "../restaurant-manage/styles/group.less"],
  providers: [CuisineDataService]
})

export class CuisineManageComponent implements OnInit{
  cuisines: Cuisine[];
  cuisine: Cuisine = new Cuisine();

  isShowCuisine: boolean = true;
  isShowCreate: boolean = false;
  isShowUpdate: boolean = false;

  constructor(private dataService: CuisineDataService) {
    dataService.url="/api/Cuisine";
  }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.dataService.Get().subscribe((data: Cuisine[]) => this.cuisines = data);
  }

  save(){
    if(this.cuisine.id === null)
      this.dataService.Post(this.cuisine).subscribe(() => this.loadData());
    else
      this.dataService.Put(this.cuisine).subscribe(() => this.loadData());

    this.cancel()
  }

  update(cuisine: Cuisine){
    this.cuisine = cuisine;
    this.show(false, false, true);
  }

  remove(cuisine: Cuisine){
    let confirmToDelete: boolean = confirm("Are you sure you want to delete this item?");

    if(confirmToDelete)
      this.dataService.Delete(cuisine.id).subscribe(() => this.loadData());
  }

  create(){
    this.cancel();
    this.show(false, true, false);
  }

  cancel(){
    this.cuisine = new Cuisine();
    this.show(true, false, false)
  }

  show(showCuisine: boolean, showCreate: boolean, showUpdate){
    this.isShowCuisine = showCuisine;
    this.isShowCreate = showCreate;
    this.isShowUpdate = showUpdate;
  }

}
