import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Order, State} from "../model/order.model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  getOrders() {
    return this.http.get<Order[]>(environment.apiUrl + '/orders');
  }

  getOrdersByUsername(username: string) {
    return this.http.get<Order[]>(environment.apiUrl + '/orders/username/' + username);
  }

  getOrdersByState(state: string) {
    return this.http.get<Order[]>(environment.apiUrl + '/orders/state/' + state);
  }

  updateState(id: string, state: string) {
    return this.http.put(environment.apiUrl + '/orders/' + id, {state: state}, {observe: "response"});
  }

  getStates() {
    return this.http.get<State[]>(environment.apiUrl + '/orders/states');
  }
}
