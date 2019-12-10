import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../model/domain/product';
import { NetworkProperties } from './network-properties';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = NetworkProperties.URL + 'products';

  constructor(private httpClient: HttpClient) { }

  save(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.url, product);
  }

  findAll(page: number): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(this.url + '?page=' + page);
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
