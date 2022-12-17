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

  getOrders(state: string) {
    if (state != '') {
      return this.http.get<Order[]>(environment.apiUrl + '/orders/state/' + state);
    } else {
      return this.http.get<Order[]>(environment.apiUrl + '/orders');
    }
  }

  updateState(id: string, state: string) {
    console.log(id)
    return this.http.put(environment.apiUrl + '/orders/' + id, {state: state}, {observe: "response"});
  }

  getStates() {
    return this.http.get<State[]>(environment.apiUrl + '/orders/states');
  }
}
