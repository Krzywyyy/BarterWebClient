import {Component, OnInit} from '@angular/core';
import {ProductService} from '../services/api/product.service';
import {Product} from '../model/domain/product';
import {FilterDataService} from '../services/componentDataSharing/filter-data.service';
import {Filter} from '../model/domain/filter';

@Component({
  selector: 'app-filtered-products',
  templateUrl: './filtered-products.component.html',
  styleUrls: ['./filtered-products.component.css']
})
export class FilteredProductsComponent implements OnInit {

  products: Array<Product>;
  page = 1;
  filter: Filter = new Filter();

  constructor(private productService: ProductService,
              private filterDataService: FilterDataService) {
  }

  ngOnInit() {
    this.filterDataService.currentFilters.subscribe(filter => {
      this.filter = filter;
      this.productService.findAll(this.page, filter).subscribe(data => {
          if (data.length > 0 || this.page === 1) {
            this.products = data;
            this.scrollToTop();
          } else {
            if (this.page > 1) {
              this.page--;
            }
          }
        }
      );
    });
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
