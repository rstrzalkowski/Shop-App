import {Injectable} from '@angular/core';
import {Product} from "../model/product.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: Product[] = [];
  private behaviorSubject = new BehaviorSubject<Product[]>([]);

  constructor() {
    let cart = localStorage.getItem('cart')
    if (cart != null) {
      this.cartItems = JSON.parse(cart);
      this.behaviorSubject.next(this.cartItems);
    }
  }

  getCartContent() {
    return this.behaviorSubject.asObservable();
  }

  addToCart(product: Product) {
    let found = false;

    this.cartItems.forEach((item) => {
      if (item.id === product.id) {
        found = true;
        item.quantity += 1;
      }
    })

    if (!found) {
      product.quantity = 1;
      this.cartItems.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(this.cartItems))
    this.behaviorSubject.next(this.cartItems);
  }
}
