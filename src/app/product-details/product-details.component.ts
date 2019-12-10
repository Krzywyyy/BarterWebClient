import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../model/domain/product';
import {ProductService} from '../services/product.service';
import {Specialization} from '../model/enums/specialization.enum';
import {ProductCategory} from '../model/enums/product-category.enum';
import {Offer} from '../model/domain/offer';
import {OfferService} from '../services/offer.service';
import {AppComponent} from '../app.component';
import * as jwt_decode from 'jwt-decode';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  private id: number;
  private subscription: any;
  private product: Product = new Product();
  private offer: Offer = new Offer();
  private offerDone;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private offerService: OfferService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.offerDone = false;
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      params => {
        this.id = +params.id;
        this.productService.find(this.id).subscribe(
          data => this.product = data
        );
      }
    );
  }

  getCategory(category: ProductCategory): string {
    return ProductCategory[category];
  }

  getSpecialization(specialization: Specialization): string {
    return Specialization[specialization];
  }

  makeAnOffer() {
    this.offer.productId = this.product.id;
    this.offer.title = this.product.title;
    this.offerService.save(this.offer).subscribe(
      () => this.offerDone = true
    );
  }

  authorized() {
    return AppComponent.isAuthorized();
  }

  offerMade(): boolean {
    return this.offerDone;
  }

  currentUserProduct() {
    const token = sessionStorage.getItem('token');
    if (token !== null) {
      const decoded = jwt_decode(token.split(' ')[1]);
      const userId = decoded.userId;
      return this.product.userId === userId;
    } else {
      return false;
    }
  }

  showDeleteConfirmation(confirmationDialog: TemplateRef<any>) {
    this.dialog.open(confirmationDialog);
  }

  deleteProduct() {
    this.productService.delete(this.id).subscribe(() => {
      this.dialog.closeAll();
      this.router.navigateByUrl('/products/my');
    });
  }
}
