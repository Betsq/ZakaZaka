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

    if(this.hasAnyProductsInStorage()){
      products = JSON.parse(this.getProductFromStorage());

      products.push(productInBasket);

      this.setInStorage(products);
    }
    else{
      products = [productInBasket];

      localStorage.setItem(this.keyToLocalStorage, JSON.stringify(products));
    }

    this.setPlusPrice(productInBasket.productPrice)
    this.setPlusQuantity(productInBasket.productCount);
  }

  public remove(productInBasket: ProductInBasket){
    if(this.hasAnyProductsInStorage()){
      let index = this.getIdProduct(productInBasket);

      if(index >= 0){
        let products = JSON.parse(this.getProductFromStorage());

        this.setMinusQuantity(products[index].productCount);
        this.setMinusPrice(products[index].productPrice);

        products.splice(index, 1);
        this.setInStorage(products);
      }
    }
  }

  private getIdProduct(productInBasket: ProductInBasket) : number{
    let products = JSON.parse(this.getProductFromStorage());

    for(let i = 0; i < products.length; i++) {
      if (products[i].productId === productInBasket.productId && products[i].restaurantId == productInBasket.restaurantId)
        return i;
    }

    return -1;
  }

  public removeAll(){
    localStorage.removeItem(this.keyToLocalStorage);

    this._price.next(0);
    this._quantity.next(0);
  }

  public getFinalPrice() : Observable<number>{
    return this._price.asObservable();
  }

  public getFinalQuantity() : Observable<number>{
    return this._quantity.asObservable();
  }

  private initialDataWhenLoadFirst() : void{
    if(this.hasAnyProductsInStorage()){
      let products = JSON.parse(this.getProductFromStorage())

      for(let i = 0; i < products.length; i++){
        let price = products[i].productPrice;
        this.setPlusPrice(price);

        let quantity = products[i].productCount;
        this.setPlusQuantity(quantity);
      }
    }
  }

  private setPlusPrice(price: number){
    let endPrice = this._price.value + price;

    this._price.next(endPrice);
  }

  private setMinusPrice(price: number){
    let endPrice = this._price.value - price;

    this._price.next(endPrice);
  }

  private setPlusQuantity(quantity: number){
    let endQuantity = this._quantity.value + quantity;

    this._quantity.next(endQuantity);
  }

  private setMinusQuantity(quantity: number){
    let endQuantity = this._quantity.value - quantity;

    this._quantity.next(endQuantity);
  }

  private setInStorage(productInBasket: ProductInBasket[]){
    let products = JSON.stringify(productInBasket);

    localStorage.setItem(this.keyToLocalStorage, products);
  }

  private hasAnyProductsInStorage(){
    let products = this.getProductFromStorage();

    return products !== null;
  }

  private getProductFromStorage(){
    return localStorage.getItem(this.keyToLocalStorage);
  }
}
