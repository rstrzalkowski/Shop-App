import {Injectable} from '@angular/core';
import {Product} from "../model/product.model";
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: Product[] = [];
  private behaviorSubject = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {
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

  removeFromCart(product: Product) {
    this.cartItems.forEach((item) => {
      if (item.id === product.id) {
        item.quantity = 0;
        this.cartItems = this.cartItems.filter((item) => item.id !== product.id)
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

  getQuantity(id: string) {
    let product = this.cartItems.filter((product) => product.id === id)[0];
    try {
      return product.quantity
    } catch (error) {
      return 0;
    }
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

  placeOrder(email: string, username: string, phoneNumber: string) {
    const order = {
      username: username,
      email: email,
      phoneNumber: phoneNumber,
      products: this.cartItems,
    }
    return this.http.post(environment.apiUrl + "/orders", order, {observe: "response"})
  }

  emptyCart() {
    this.cartItems = [];
    this.behaviorSubject.next(this.cartItems);
  }
}
