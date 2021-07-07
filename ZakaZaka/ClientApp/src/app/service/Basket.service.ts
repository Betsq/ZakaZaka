import {Injectable, OnDestroy} from "@angular/core";
import {ProductInBasket} from "../Model/ProductInBasket";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})

export class BasketService{
  constructor() {
    this.initialDataWhenLoadFirst();
  }

  private _quantity = new BehaviorSubject<number>(0);
  private _price = new BehaviorSubject<number>(0);

  private keyToLocalStorage: string = "Basket";

  public addToBasket(productInBasket: ProductInBasket){
    let products : ProductInBasket[];

    if(this.hasProductsInStorage()){
      products = JSON.parse(this.getProductFromStorage());

      products.push(productInBasket);

      this.setInStorage(products);
    }
    else{
      products = [productInBasket];

      localStorage.setItem(this.keyToLocalStorage, JSON.stringify(products));
    }

    this.setPrice(productInBasket.productPrice)
    this.setQuantity(productInBasket.productCount);
  }

  public getFinalPrice() : Observable<number>{
    return this._price.asObservable();
  }

  public getFinalQuantity() : Observable<number>{
    return this._quantity.asObservable();
  }

  private initialDataWhenLoadFirst() : void{
    if(this.hasProductsInStorage()){
      let products = JSON.parse(this.getProductFromStorage())

      for(let i = 0; i < products.length; i++){
        let price = products[i].productPrice;
        this.setPrice(price);

        let quantity = products[i].productCount;
        this.setQuantity(quantity);
      }
    }
  }

  private setPrice(price: number){
    let endPrice = this._price.value + price;

    this._price.next(endPrice);
  }

  private setQuantity(quantity: number){
    let endQuantity = this._quantity.value + quantity;

    this._quantity.next(endQuantity);
  }

  private setInStorage(productInBasket: ProductInBasket[]){
    let products = JSON.stringify(productInBasket);

    localStorage.setItem(this.keyToLocalStorage, products);
  }

  private hasProductsInStorage(){
    let products = this.getProductFromStorage();

    return products !== null;
  }

  private getProductFromStorage(){
    return localStorage.getItem(this.keyToLocalStorage);
  }
}
