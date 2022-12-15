import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private productsService: ProductsService) {}

  nameOrder = true;
  priceOrder = true;
  weightOrder = true;

  ngOnInit(): void {
  }

  getProducts(){
    return this.productsService.products;
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
}
