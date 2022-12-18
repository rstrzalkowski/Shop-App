import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Product} from "../../model/product.model";
import {ActivatedRoute} from "@angular/router";
import {Category} from "../../model/category.model";
import {FormControl, FormGroup} from "@angular/forms";

declare var $: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  actualCategory: string = "";
  categories: Category[] = [];

  editProductForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    weight: new FormControl(''),
    category: new FormControl(''),
    price: new FormControl(''),
  })

  get name() {
    return this.editProductForm.get('email');
  }

  get description() {
    return this.editProductForm.get('description');
  }

  get weight() {
    return this.editProductForm.get('weight');
  }

  get category() {
    return this.editProductForm.get('category');
  }

  get price() {
    return this.editProductForm.get('price');
  }

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute) {
  }

  nameOrder = true;
  priceOrder = true;
  weightOrder = true;
  nameFilter = "";

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let param = params.get('category')?.toString()
      if (param) {
        this.actualCategory = param;
      }
      this.nameFilter = "";
      this.getProducts();
      this.getCategories();
    })
  }

  getProducts() {
    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  getCategories() {
    this.productsService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }


  getProductsFiltered() {
    return this.products.filter((product) => {
      if (this.actualCategory === "") {
        return product.name.toLowerCase().includes(this.nameFilter.toLowerCase())
      }
      return (product.category.name == this.actualCategory) && (product.name.toLowerCase().includes(this.nameFilter.toLowerCase()));
    });
  }

  activate(column: string) {
    document.getElementById("nameHead")!.classList.remove("asc");
    document.getElementById("nameHead")!.classList.remove("desc");
    document.getElementById("priceHead")!.classList.remove("asc");
    document.getElementById("priceHead")!.classList.remove("desc");
    let order;
    switch (column) {
      case 'nameHead':
        order = this.nameOrder;
        this.nameOrder = !this.nameOrder;
        break;
      case 'weightHead':
        order = this.weightOrder;
        this.weightOrder = !this.weightOrder;
        break;
      case 'priceHead':
        order = this.priceOrder;
        this.priceOrder = !this.priceOrder;
        break;
      default:
        order = true;
        break;
    }
    let className = (order) ? "asc" : "desc";
    document.getElementById(column)!.classList.add(className);
  }


  sort(prop: string, asc: boolean) {
    this.products.sort(this.sortHelper(prop, asc));
  }

  sortHelper(prop: string, asc: boolean) {
    if (asc) {
      return (a: any, b: any) => {
        if (typeof (a[prop]) === 'string') {
          return (a[prop] >= b[prop]) ? 1 : -1;
        }
        return a[prop] - b[prop];
      }
    } else {
      return (a: any, b: any) => {
        if (typeof (a[prop]) === 'string') {
          return (b[prop] >= a[prop]) ? 1 : -1;
        }
        return b[prop] - a[prop];
      }
    }
  }

  showEditForm(product: Product) {
    this.resetEditForm();
    $('#product_id').text(product.id);
    $('#name').val(product.name);
    $('#description').val(product.description);
    $('#weight').val(product.weight);
    $('#category').append('<option id="category_actual"></option>');
    $('#category_actual').text(product.category.name);

    this.categories.forEach((category) => {
      if (category.name != product.category.name) {
        $('#category_actual').after(`<option>${category.name}</option>`)
      }
    })
    $('#price').val(product.price);
    $('#editFormModal').modal('show');
  }

  saveEditedProduct() {
    let id = $('#product_id').text()
    let name = $('#name').val();
    let description = $('#description').val();
    let weight = $('#weight').val();
    let category = $('#category').val();
    let price = $('#price').val();

    this.productsService.editProduct(id, name, description, weight, category, price).subscribe((result) => {
      $('#editFormModal').modal('hide');
      this.ngOnInit()
    }, (error) => {
      $('#error-div').empty();
      error.error.message.forEach((message: string) => {
        $('#error-div').append(`<p>- ${message}</p>`);
      })
    })
  }

  resetEditForm() {
    $('#error-div').empty();
    $('#category').empty();
  }

}
