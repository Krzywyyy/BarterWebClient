import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/domain/product';
import { NetworkProperties } from './network-properties';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }
  url = NetworkProperties.URL + 'products';

  save(product: Product): any {
    this.httpClient.post(this.url, product);
  }

  findAll(page: number) {
    return this.httpClient.get(this.url + '?page=' + page);
  }

  findAllUserProducts(): any {
    return this.httpClient.get(this.url + '/my');
  }

  find(id: number) {
    return this.httpClient.get(this.url + '/${id}')
  }

  delete(id: number) {
    return this.httpClient.delete(this.url + '/{id}')
  }
}
