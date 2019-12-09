import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {UserProductsComponent} from './user-products/user-products.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'products/details/:id', component: ProductDetailsComponent},
  {path: 'products/my', component: UserProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
