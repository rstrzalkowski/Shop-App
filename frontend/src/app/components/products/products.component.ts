import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Observable} from "rxjs";
import {Product} from "../../model/product.model";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$: Observable<Product[]> | undefined

  constructor(
    private productsService: ProductsService,
    private cartService: CartService) {
  }

  ngOnInit(): void {
    this.products$ = this.getProducts();
  }

  getProducts() {
    return this.productsService.loadProducts();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
