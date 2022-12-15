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

  increaseQuantity(product: Product) {
    this.cartItems.forEach((item) => {
      if (item.id === product.id) {
        item.quantity += 1;

        localStorage.setItem('cart', JSON.stringify(this.cartItems))
        this.behaviorSubject.next(this.cartItems);
      }
    })
  }

  decreaseQuantity(product: Product) {
    this.cartItems.forEach((item) => {
      if (item.id === product.id) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          this.cartItems = this.cartItems.filter((item) => item.id !== product.id)
        }
        localStorage.setItem('cart', JSON.stringify(this.cartItems))
        this.behaviorSubject.next(this.cartItems);
      }
    })
  }

  getTotalPrice() {
    let total = 0;

    this.cartItems.forEach((item) => {
      total += item.price * item.quantity
    });

    return total;
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
