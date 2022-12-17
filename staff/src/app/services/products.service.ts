import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Product} from "../model/product.model";
import {environment} from "../../environments/environment";
import {Category} from "../model/category.model";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {
  }

  getProducts() {
    return this.http.get<Product[]>(environment.apiUrl + '/products');
  }

  getCategories() {
    return this.http.get<Category[]>(environment.apiUrl + '/categories')
  }
}
