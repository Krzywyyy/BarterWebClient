import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {ProductCategory} from '../model/enums/product-category.enum';
import {Specialization} from '../model/enums/specialization.enum';
import {Filter} from '../model/domain/filter';
import {FilterDataService} from '../services/componentDataSharing/filter-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {LocationService} from '../services/location.service';

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

  constructor(private filterDataService: FilterDataService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private locationService: LocationService
  ) {
  }

  ngOnInit() {
    this.clearFilters();
  }

  changeFilters() {
    this.locationService.getUserLocation().then(position => {
      this.filter.userLatitude = position.latitude;
      this.filter.userLongitude = position.longitude;
      this.filterDataService.changeFilters(this.filter);
    });
    this.changeComponentIfRequired();
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

  changeComponentIfRequired() {
    if (this.activatedRoute.component === HomeComponent) {
      this.router.navigateByUrl('/products');
    }
  }
}
