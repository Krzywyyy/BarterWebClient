import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {UserProductsComponent} from './user-products/user-products.component';
import {NewProductComponent} from './new-product/new-product.component';
import {UserOffersComponent} from './user-offers/user-offers.component';
import {FilteredProductsComponent} from './filtered-products/filtered-products.component';
import {AuthGuardService} from './services/api/auth-guard.service';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'products', component: FilteredProductsComponent},
  {path: 'products/details/:id', component: ProductDetailsComponent},
  {path: 'products/my', component: UserProductsComponent, canActivate: [AuthGuardService]},
  {path: 'products/new', component: NewProductComponent, canActivate: [AuthGuardService]},
  {path: 'offers/my', component: UserOffersComponent, canActivate: [AuthGuardService]},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
