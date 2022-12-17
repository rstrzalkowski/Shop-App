import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../services/order.service";
import {Order} from "../../model/order.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[] = [];
  state: string = '';

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let param = params.get('state')?.toString()
      if (param) {
        this.state = param;
      }
      this.getOrders();
    })
  }

  getTotal(order: Order) {
    let total = 0;

    order.products.forEach((item) => {
      total += item.product.price * item.quantity
    });

    return total;
  }

  getOrders() {
    this.orderService.getOrders(this.state).subscribe((orders) => {
      this.orders = orders;
      this.orders.forEach((order) => {
        order.products.forEach((product) => {
          product.product.quantity = product.quantity
        })
      })
    })
  }

  confirmOrder(id: string) {
    this.orderService.updateState(id, "CONFIRMED").subscribe((result) => {
      this.getOrders();
    }, error => {
      alert(error.message)
    })
  }

  cancelOrder(id: string) {
    this.orderService.updateState(id, "CANCELLED").subscribe((result) => {
      this.getOrders();
    }, error => {
      alert(error.message)
    })
  }

  markOrderAsDone(id: string) {
    this.orderService.updateState(id, "DONE").subscribe((result) => {
      this.getOrders();
    }, error => {
      alert(error.message)
    })
  }

}
