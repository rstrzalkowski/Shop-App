import {Component, OnInit} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {Product} from "../../model/product.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  orderForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required])
  })

  showForm = false;

  get email() {
    return this.orderForm.get('email');
  }

  get username() {
    return this.orderForm.get('username');
  }

  get phoneNumber() {
    return this.orderForm.get('phoneNumber');
  }

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
  }

  getCartContent() {
    return this.cartService.getCartContent();
  }

  increaseQuantity(product: Product) {
    this.cartService.increaseQuantity(product);
  }

  decreaseQuantity(product: Product) {
    this.cartService.decreaseQuantity(product);
  }

  removeFromCart(product: Product) {
    if (window.confirm("Do you really want to remove this item from cart?")) {
      this.cartService.removeFromCart(product);
    }
  }

  getTotalPrice() {
    return this.cartService.getTotalPrice();
  }

  onShowForm() {
    this.showForm = true;
  }

  onCancel() {
    this.showForm = false;
  }

  onSubmit() {
    this.cartService.placeOrder(this.email?.getRawValue(), this.username?.getRawValue(), this.phoneNumber?.getRawValue()).subscribe((result) => {
      if (result.status === 201) {
        this.cartService.emptyCart();
      }
    })
  }
}
