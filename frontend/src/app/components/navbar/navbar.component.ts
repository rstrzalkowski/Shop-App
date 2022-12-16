import {Component, OnInit} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {ProductsService} from "../../services/products.service";
import {Category} from "../../model/category.model";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isMenuCollapsed = true;
  cartItemCount = 0;
  categories: Category[] = [];

  constructor(
    private cartService: CartService,
    private productService: ProductsService) {
  }

  ngOnInit(): void {
    this.getCartItemCount();
    this.getCategories();
  }

  getCartItemCount() {
    this.cartService.getCartContent().subscribe((cart) => {
      this.cartItemCount = cart.length;
    })
  }

  getCategories() {
    this.productService.getCategories().subscribe((result) => {
      this.categories = result;
    });
  }

}
