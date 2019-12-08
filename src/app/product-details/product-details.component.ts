import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../model/domain/product';
import {ProductService} from '../services/product.service';
import {Specialization} from '../model/enums/specialization.enum';
import {ProductCategory} from '../model/enums/product-category.enum';
import {Offer} from '../model/domain/offer';
import {OfferService} from '../services/offer.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  id: number;
  private subscription: any;
  private product: Product = new Product();
  private offer: Offer = new Offer();

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private offerService: OfferService
  ) {
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
      response => console.log(response.message)
    );
  }
}
