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

  nameOrder = true;
  priceOrder = true;
  weightOrder = true;

  ngOnInit(): void {
    this.products$ = this.getProducts();
  }

  getProducts() {
    return this.productsService.loadProducts();
  }

  sort(prop: string, asc: boolean){
    this.productsService.sort(prop, asc);
  }

  activate(column: string){
    document.getElementById("nameHead")!.classList.remove("asc");
    document.getElementById("nameHead")!.classList.remove("desc");
    document.getElementById("weightHead")!.classList.remove("asc");
    document.getElementById("weightHead")!.classList.remove("desc");
    document.getElementById("priceHead")!.classList.remove("asc");
    document.getElementById("priceHead")!.classList.remove("desc");
    let order;
    switch(column){
      case 'nameHead':
        order = this.nameOrder;
        break;
      case 'weightHead':
        order = this.weightOrder;
        break;
      case 'priceHead':
        order = this.priceOrder;
        break;
      default:
        order = true;
        break;
    }
    let className = (order) ? "asc" : "desc";
    document.getElementById(column)!.classList.add(className);
  }
  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
