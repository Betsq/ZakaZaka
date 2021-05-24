import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule} from "@angular/router";

import { AppComponent } from "./app.component";
import {Home} from "./home/home.component";
import {Slider} from "./home/addition/slider";
import {Header} from "./header/header.component";
import {Footer} from "./footer/footer.component";

const appRoutes: Routes = [
  { path: '', component: Home },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(appRoutes)],
    declarations: [AppComponent, Home, Slider, Header, Footer],
  bootstrap: [ AppComponent]
})
export class AppModule{

}
