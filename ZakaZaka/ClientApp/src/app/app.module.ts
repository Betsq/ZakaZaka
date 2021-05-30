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

const appRoutes: Routes = [
  { path: '', component: Home },
  { path: "restaurantManage", component: RestaurantManageComponent},
  { path: '**', redirectTo: '/' }

];

@NgModule({
  imports: [BrowserModule, FormsModule,ReactiveFormsModule, HttpClientModule, RouterModule.forRoot(appRoutes)],
  declarations: [AppComponent, Home, Slider, Header, Footer, RestaurantManageComponent],
  bootstrap: [ AppComponent]
})
export class AppModule{

}
