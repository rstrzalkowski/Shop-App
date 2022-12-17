import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Product} from "../../model/product.model";
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
    private route: ActivatedRoute) {
  }

  nameOrder = true;
  priceOrder = true;
  weightOrder = true;
  nameFilter = "";

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let param = params.get('category')?.toString()
      if (param) {
        this.category = param;
      }
      this.nameFilter = "";
      this.getProducts();
    })
  }

  getProducts() {
    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }


  getProductsFiltered() {
    return this.products.filter((product) => {
      if (this.category === "") {
        return product.name.toLowerCase().includes(this.nameFilter.toLowerCase())
      }
      return (product.category.name == this.category) && (product.name.toLowerCase().includes(this.nameFilter.toLowerCase()));
    });
  }

  activate(column: string) {
    document.getElementById("nameHead")!.classList.remove("asc");
    document.getElementById("nameHead")!.classList.remove("desc");
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
