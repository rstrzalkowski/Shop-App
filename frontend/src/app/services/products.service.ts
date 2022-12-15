import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Product} from "../model/product.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {
  }

  loadProducts() {
    return this.http.get<Product[]>(environment.apiUrl + '/products');
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
