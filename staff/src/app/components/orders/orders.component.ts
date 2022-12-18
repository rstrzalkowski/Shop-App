import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../services/order.service";
import {Order} from "../../model/order.model";
import {ActivatedRoute, Router} from "@angular/router";

declare var $: any;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[] = [];
  state: string = '';
  username: string = '';
  usernameFilter: string ='';

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
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
    this.route.paramMap.subscribe((params) => {
      let param = params.get('username')?.toString()
      if (param) {
        this.username = param;
      }
      this.getOrders();
    })
  }

  navigateToOrdersByUsername(){
    if(this.usernameFilter != ''){
      this.router.navigate([`/orders/username/${this.usernameFilter}`]);
    } else {
      this.router.navigate([`/orders/`]);
    }
  }

  getTotal(order: Order) {
    let total = 0;

    order.products.forEach((item) => {
      total += item.product.price * item.quantity
    });

    return total;
  }

  getOrders() {
    if(this.state != ''){
      this.orderService.getOrdersByState(this.state).subscribe((orders) => {
        this.orders = orders;
        this.mapOrders();
      })
    }
    else if(this.username != ''){
      this.orderService.getOrdersByUsername(this.username).subscribe((orders) => {
        this.orders = orders;
        this.mapOrders();
      })
    } else {
      this.orderService.getOrders().subscribe((orders) => {
        this.orders = orders;
        this.mapOrders();
      })
    }
  }

  mapOrders(){
    this.orders.forEach((order) => {
      order.products.forEach((product) => {
        product.product.quantity = product.quantity
      })
    })
  }

  confirmOrder(id: string) {
    this.orderService.updateState(id, "CONFIRMED").subscribe((result) => {
      this.getOrders();
    }, error => {
      this.showModalWithErrorMessage(error.error.message);
    })
  }

  cancelOrder(id: string) {
    this.orderService.updateState(id, "CANCELLED").subscribe((result) => {
      this.getOrders();
    }, error => {
      this.showModalWithErrorMessage(error.error.message);
    })
  }

  markOrderAsDone(id: string) {
    this.orderService.updateState(id, "DONE").subscribe((result) => {
      this.getOrders();
    }, error => {
      this.showModalWithErrorMessage(error.error.message);
    })
  }

  showModalWithErrorMessage(message: string) {
    $('#error-desc').text(message);
    $('#exampleModal').modal('show');
  }

}
