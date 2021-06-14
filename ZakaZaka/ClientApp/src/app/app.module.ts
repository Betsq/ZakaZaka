import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { HttpClientModule}  from "@angular/common/http";

import { AppComponent } from "./app.component";
import {Home} from "./Components/home/home.component";
import {Slider} from "./Components/home/addition/slider";
import {Header} from "./Components/header/header.component";
import {Footer} from "./Components/footer/footer.component";
import {RestaurantManageComponent} from "./Components/restaurant-manage/restaurantManage.component"
import {CuisineManageComponent} from "./Components/cusinine-manage/cuisineManage.component";
import {RestaurantsComponent} from "./Components/restaurants/restaurants.component";
import {RestaurantFoodManageComponent} from "./Components/restaurantFood-manage/restaurantFoodManage.component";

import {RestaurantComponent} from "./Components/restaurant/restaurant.component";
import {RestaurantMenuComponent} from "./Components/restaurant/child.component/menu/restaurantMenu.component"
import {RestaurantReviewComponent} from "./Components/restaurant/child.component/review/restaurantReview.component";

//restaurant's the child components
const restaurantRoutes: Routes = [
  {path: "menu", component: RestaurantMenuComponent},
  {path: "reviews", component: RestaurantReviewComponent}
];

const appRoutes: Routes = [
  { path: "", component: Home },
  { path: "restaurantManage", component: RestaurantManageComponent},
  { path: "cuisineManage", component: CuisineManageComponent},
  { path: "restaurants", component: RestaurantsComponent},
  { path: "restaurantFoodManage/:id", component: RestaurantFoodManageComponent},
  { path: "restaurant/:id", component: RestaurantComponent},
  { path: "restaurant/:id", component: RestaurantComponent, children: restaurantRoutes},
  { path: "**", redirectTo: "/" }
]


@NgModule({
  imports: [BrowserModule, FormsModule,ReactiveFormsModule, HttpClientModule, RouterModule.forRoot(appRoutes)],
  declarations: [
    AppComponent, Home, Slider, Header, Footer, RestaurantManageComponent, RestaurantsComponent,
    CuisineManageComponent, RestaurantFoodManageComponent, RestaurantComponent, RestaurantMenuComponent,
    RestaurantReviewComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule{}
