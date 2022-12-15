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
  
}
