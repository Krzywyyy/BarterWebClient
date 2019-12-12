import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';
import {Product} from '../model/domain/product';
import {Specialization} from '../model/enums/specialization.enum';
import {ProductCategory} from '../model/enums/product-category.enum';

@Component({
  selector: 'app-filtered-products',
  templateUrl: './filtered-products.component.html',
  styleUrls: ['./filtered-products.component.css']
})
export class FilteredProductsComponent implements OnInit {

  products: Array<Product>;
  page = 1;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.productService.findAll(this.page).subscribe(data => {
        if (data.length > 0) {
          this.products = data;
          this.scrollToTop();
        }
      }
    );
  }

  nextPage() {
    this.page++;
    this.ngOnInit();
  }

  previousPage() {
    this.page--;
    this.ngOnInit();
  }

  getPage() {
    return this.page;
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
