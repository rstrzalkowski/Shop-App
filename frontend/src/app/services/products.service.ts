import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
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
      this.sort('name', true);
    })
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
