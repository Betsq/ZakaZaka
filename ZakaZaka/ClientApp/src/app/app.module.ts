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
import { RestaurantManageComponent } from "./restaurant-manage/restaurantManage.component"
import { RestaurantsComponent} from "./restaurants/restaurants.component";

const appRoutes: Routes = [
  { path: '', component: Home },
  { path: "restaurantManage", component: RestaurantManageComponent},
  { path: "restaurants", component: RestaurantsComponent},
  { path: '**', redirectTo: '/' }

];

@NgModule({
  imports: [BrowserModule, FormsModule,ReactiveFormsModule, HttpClientModule, RouterModule.forRoot(appRoutes)],
  declarations: [AppComponent, Home, Slider, Header, Footer, RestaurantManageComponent, RestaurantsComponent],
  bootstrap: [ AppComponent]
})
export class AppModule{

}
