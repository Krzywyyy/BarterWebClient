import {Component, OnInit} from '@angular/core';
import {ProductCategory} from '../model/enums/product-category.enum';
import {Specialization} from '../model/enums/specialization.enum';
import {Filter} from '../model/domain/filter';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.css']
})
export class ProductFiltersComponent implements OnInit {

  expanded: boolean;

  category = ProductCategory;
  categoryKeys = Object.keys(this.category);
  specialization = Specialization;
  specializationKeys = Object.keys(this.specialization);

  filter: Filter = new Filter();

  constructor() {
  }

  ngOnInit() {
    this.clearFilters();
  }

  findProducts() {
    console.log('szukam ' + this.filter.searchText);
    console.log('kategoria ' + this.filter.category);
    console.log('specjalizacja ' + this.filter.specialization);
  }

  clearFilters() {
    this.filter.searchText = '';
    this.filter.category = ProductCategory.ALL;
    this.filter.specialization = Specialization.ALL;
  }

  expandedButtonText(): string {
    return this.expanded ? 'Ukryj filtry ↑' : 'Pokaż filtry ↓';
  }

  hideOrShowFilters() {
    this.expanded = !this.expanded;
  }
}
