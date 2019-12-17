import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../model/domain/product';
import {NetworkProperties} from '../network-properties';
import {Observable} from 'rxjs/internal/Observable';
import {ProductCategory} from '../../model/enums/product-category.enum';
import {Specialization} from '../../model/enums/specialization.enum';
import {Filter} from '../../model/domain/filter';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = NetworkProperties.URL + 'products';

  constructor(private httpClient: HttpClient) {
  }

  save(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.url, product);
  }

  // findAll(page: number, searchText?: string, category?: ProductCategory, specialization?: Specialization): Observable<Array<Product>> {
  //   if (ProductCategory[category] === ProductCategory.ALL || category === ProductCategory.ALL) {
  //     category = undefined;
  //   }
  //   if (Specialization[specialization] === Specialization.ALL || specialization === Specialization.ALL) {
  //     specialization = undefined;
  //   }
  //   return this.httpClient.get<Array<Product>>(this.url, {
  //     params: {
  //       page: page.toString(),
  //       searchText: (searchText !== undefined) ? searchText : '',
  //       category: category !== undefined ? category.valueOf() : '',
  //       specialization: specialization !== undefined ? specialization.valueOf() : '',
  //     }
  //   });
  // }

  findAll(page: number, filter: Filter): Observable<Array<Product>> {
    if (ProductCategory[filter.category] === ProductCategory.ALL || filter.category === ProductCategory.ALL) {
      filter.category = undefined;
    }
    if (Specialization[filter.specialization] === Specialization.ALL || filter.specialization === Specialization.ALL) {
      filter.specialization = undefined;
    }
    return this.httpClient.get<Array<Product>>(this.url, {
      params: {
        page: page.toString(),
        searchText: (filter.searchText !== undefined) ? filter.searchText : '',
        category: filter.category !== undefined ? filter.category.valueOf() : '',
        specialization: filter.specialization !== undefined ? filter.specialization.valueOf() : '',
        latitude: filter.userLatitude !== undefined ? filter.userLatitude.toString() : '0',
        longitude: filter.userLongitude !== undefined ? filter.userLongitude.toString() : '0',
        distance: filter.distance !== undefined ? filter.distance.toString() : '100000'
      }
    });
  }

  findAllUserProducts(): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(this.url + '/my');
  }

  find(id: number): Observable<Product> {
    return this.httpClient.get<Product>(this.url + '/' + id);
  }

  delete(id: number) {
    return this.httpClient.delete(this.url + '/' + id);
  }
}
