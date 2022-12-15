import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Product} from "../../model/product.model";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private cartService: CartService) {
  }

  nameOrder = true;
  priceOrder = true;
  weightOrder = true;

  ngOnInit(): void {
    this.productsService.loadProducts().subscribe((products) => {
      this.products = products;
    });
  }

  getProducts() {
    return this.products;
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
        this.nameOrder = !this.nameOrder;
        break;
      case 'weightHead':
        order = this.weightOrder;
        this.weightOrder = !this.weightOrder;
        break;
      case 'priceHead':
        order = this.priceOrder;
        this.priceOrder = !this.priceOrder;
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

  sort(prop: string, asc: boolean){
    this.products.sort(this.sortHelper(prop, asc));
  }

  sortHelper(prop: string, asc: boolean){
    if(asc){
      return (a: any, b: any) => {
        return a[prop] - b[prop];
      }
    } else {
      return (a: any, b: any) => {
        return b[prop] - a[prop];
      }
    }
  }
}
