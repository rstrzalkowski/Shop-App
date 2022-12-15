import {Component, OnInit} from '@angular/core';
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isMenuCollapsed = true;
  cartItemCount = 0;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.getCartItemCount();
  }

  getCartItemCount() {
    this.cartService.getCartContent().subscribe((cart) => {
      this.cartItemCount = cart.length;
    })
  }

}
