import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Category} from "../../model/category.model";
import {OrderService} from "../../services/order.service";
import {State} from "../../model/order.model";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isMenuCollapsed = true;
  categories: Category[] = [];
  states: State[] = [];

  constructor(
    private productService: ProductsService,
    private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.getCategories();
    this.getStates();
  }


  getCategories() {
    this.productService.getCategories().subscribe((result) => {
      this.categories = result;
    });
  }

  getStates() {
    this.orderService.getStates().subscribe((result) => {
      this.states = result;
    });
  }
}
