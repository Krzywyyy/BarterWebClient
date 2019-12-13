import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserService} from './services/api/user.service';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {RegisterComponent} from './register/register.component';
import {FailedRegistrationDataDialogComponent} from './dialogs/failed-registration-data-dialog/failed-registration-data-dialog.component';
import {HomeComponent} from './home/home.component';
import {ProductService} from './services/api/product.service';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {OfferService} from './services/api/offer.service';
import {AuthenticationInterceptor} from './network/authentication-interceptor';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { UserProductsComponent } from './user-products/user-products.component';
import { NewProductComponent } from './new-product/new-product.component';
import { UserOffersComponent } from './user-offers/user-offers.component';
import { FilteredProductsComponent } from './filtered-products/filtered-products.component';
import { ProductFiltersComponent } from './product-filters/product-filters.component';
import { ProductOffersComponent } from './product-offers/product-offers.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    RegisterComponent,
    FailedRegistrationDataDialogComponent,
    HomeComponent,
    ProductDetailsComponent,
    UserProductsComponent,
    NewProductComponent,
    UserOffersComponent,
    FilteredProductsComponent,
    ProductFiltersComponent,
    ProductOffersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    },
    UserService,
    ProductService,
    OfferService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    RegisterComponent,
    FailedRegistrationDataDialogComponent
  ]
})
export class AppModule {

}
