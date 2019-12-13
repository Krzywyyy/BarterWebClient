import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductOffersService {

  private productIdSource = new BehaviorSubject<number>(0);
  currentProductId = this.productIdSource.asObservable();

  constructor() {
  }

  changeProductId(productId: number) {
    this.productIdSource.next(productId);
  }
}
