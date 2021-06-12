import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { HttpClientModule}  from "@angular/common/http";

import { AppComponent } from "./app.component";
import {Home} from "./home/home.component";
import {Slider} from "./home/addition/slider";
import {Header} from "./header/header.component";
import {Footer} from "./footer/footer.component";
import {RestaurantManageComponent} from "./restaurant-manage/restaurantManage.component"
import {CuisineManageComponent} from "./cusinine-manage/cuisineManage.component";
import {RestaurantsComponent} from "./restaurants/restaurants.component";
import {RestaurantFoodManageComponent} from "./restaurantFood-manage/restaurantFoodManage.component";

import {RestaurantComponent} from "./restaurant/restaurant.component";
import {RestaurantMenuComponent} from "./restaurant/child.component/menu/restaurantMenu.component"
import {RestaurantReviewComponent} from "./restaurant/child.component/review/restaurantReview.component";

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
  { path: "restaurantFoodManage", component: RestaurantFoodManageComponent},
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
