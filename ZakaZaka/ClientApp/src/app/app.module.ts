import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule} from "@angular/router";

import { AppComponent } from "./app.component";
import {Home} from "./home/home.component";

const appRoutes: Routes = [
  {path: "", component: Home},
];

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, Home],
  bootstrap: [ AppComponent]
})
export class AppModule{

}
