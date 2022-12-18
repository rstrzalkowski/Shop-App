import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from "./components/products/products.component";
import {OrdersComponent} from "./components/orders/orders.component";

const routes: Routes = [
  {path: 'products', component: ProductsComponent},
  {path: 'products/:category', component: ProductsComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'orders/state/:state', component: OrdersComponent},
  {path: 'orders/username/:username', component: OrdersComponent},
  {path: '**', redirectTo: 'products'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
