import {Component, OnInit} from "@angular/core";
import {BasketService} from "../../../service/Basket.service";

@Component({
  selector: "basket-helper",
  templateUrl: "basket-helper.component.html",
  styleUrls: ["basket-helper.component.less"]
})

export class BasketHelperComponent implements OnInit{
  public price : number;
  public quantity: number;

  public showHelper : boolean = false;

  constructor(private basket: BasketService) {}

  ngOnInit() {
    this.basket.getFinalPrice().subscribe(value => this.setPrice(value));
    this.basket.getFinalQuantity().subscribe(value => this.setQuantity(value));
  }

  private setPrice(price: number){
    this.price = price;

    this.showBasketHelper();
  }

  private setQuantity(quantity: number){
    this.quantity = quantity;

    this.showBasketHelper();
  }


  private showBasketHelper(){
    let isValid = this.isValid();

    console.log(isValid);
    if(isValid){
      this.showHelper = true;
    }
    else {
      this.showHelper = false;
    }
  }

  private isValid() : boolean{
    if(this.price < 1 && this.quantity < 1)
      return false;

    return true
  }
}
