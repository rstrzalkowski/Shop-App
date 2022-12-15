import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {
    this.loadProducts();
  }

  apiUrl = 'http://localhost:3000/products';
  products: Product[] = [];

  loadProducts(){
    this.http.get<Product[]>(this.apiUrl).subscribe((products) =>{
      this.products = products;
    })
  }
}
