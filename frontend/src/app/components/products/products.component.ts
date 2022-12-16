import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Product} from "../../model/product.model";
import {CartService} from "../../services/cart.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  category: string = "";

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private route: ActivatedRoute) {
  }

  nameOrder = true;
  priceOrder = true;
  weightOrder = true;

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
    });
    this.route.paramMap.subscribe((params) => {
      let param = params.get('category')?.toString()
      if (param) {
        this.category = param;
      }
    })
  }

  getProducts() {
    return this.products.filter((product) => {
      if (this.category === "") {
        return product;
      }
      return product.category.name == this.category;
    });
  }

  getProductQuantityInCart(id: string) {
    return this.cartService.getQuantity(id);
  }

  activate(column: string) {
    document.getElementById("nameHead")!.classList.remove("asc");
    document.getElementById("nameHead")!.classList.remove("desc");
    document.getElementById("weightHead")!.classList.remove("asc");
    document.getElementById("weightHead")!.classList.remove("desc");
    document.getElementById("priceHead")!.classList.remove("asc");
    document.getElementById("priceHead")!.classList.remove("desc");
    let order;
    switch (column) {
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

  sort(prop: string, asc: boolean) {
    this.products.sort(this.sortHelper(prop, asc));
  }

  sortHelper(prop: string, asc: boolean) {
    if (asc) {
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
