import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/domain/product';
import { ProductService } from '../services/product.service';
import { Specialization } from '../model/enums/specialization.enum';
import { ProductCategory } from '../model/enums/product-category.enum';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  id: number;
  private subscription: any;
  private product: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      params => {
        this.id = +params['id'];
        this.productService.find(this.id).subscribe(
          data => this.product = data
        );
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getCategory(category: ProductCategory): string {
    return ProductCategory[category];
  }

  getSpecialization(specialization: Specialization): string {
    return Specialization[specialization];
  }
}
