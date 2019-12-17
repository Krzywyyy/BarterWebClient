import {Component, OnInit} from '@angular/core';
import {Product} from '../model/domain/product';
import {ProductService} from '../services/api/product.service';
import {ProductCategory} from '../model/enums/product-category.enum';
import {Specialization} from '../model/enums/specialization.enum';
import {Filter} from '../model/domain/filter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Array<Product>;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.productService.findAll(1, new Filter()).subscribe(
      data => this.products = data
    );
  }

  getCategory(category: ProductCategory): string {
    return ProductCategory[category];
  }

  getSpecialization(specialization: Specialization): string {
    return Specialization[specialization];
  }
}
