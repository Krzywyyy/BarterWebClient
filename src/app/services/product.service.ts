import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../model/domain/product';
import {NetworkProperties} from './network-properties';
import {Observable} from 'rxjs/internal/Observable';
import {ProductCategory} from '../model/enums/product-category.enum';
import {Specialization} from '../model/enums/specialization.enum';

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

  findAll(page: number, searchText?: string, category?: ProductCategory, specialization?: Specialization): Observable<Array<Product>> {
    if (ProductCategory[category] === ProductCategory.ALL || category === ProductCategory.ALL) {
      category = undefined;
    }
    if (Specialization[specialization] === Specialization.ALL || specialization === Specialization.ALL) {
      specialization = undefined;
    }
    return this.httpClient.get<Array<Product>>(this.url, {
      params: {
        page: page.toString(),
        searchText: (searchText !== undefined) ? searchText : '',
        category: category !== undefined ? category.valueOf() : '',
        specialization: specialization !== undefined ? specialization.valueOf() : ''
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
