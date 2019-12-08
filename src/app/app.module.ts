import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './services/user.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { RegisterComponent } from './register/register.component';
import { FailedRegistrationDataDialogComponent } from './dialogs/failed-registration-data-dialog/failed-registration-data-dialog.component';
import { HomeComponent } from './home/home.component';
import { ProductService } from './services/product.service';
import { ProductDetailsComponent } from './product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    RegisterComponent,
    FailedRegistrationDataDialogComponent,
    HomeComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [UserService, ProductService],
  bootstrap: [AppComponent],
  entryComponents: [
    RegisterComponent,
    FailedRegistrationDataDialogComponent
  ]
})
export class AppModule { }
