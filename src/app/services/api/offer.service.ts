import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NetworkProperties} from '../network-properties';
import {Offer} from '../../model/domain/offer';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  url = NetworkProperties.URL + 'offers';

  constructor(private httpClient: HttpClient) {
  }

  save(offer: Offer): Observable<Offer> {
    return this.httpClient.post<Offer>(this.url, offer);
  }

  findAllByProduct(productId: number): Observable<Array<Offer>> {
    return this.httpClient.get<Array<Offer>>(this.url, {
      params: {
        productId: productId.toString()
      }
    });
  }

  findAllUserOffers(): Observable<Array<Offer>> {
    return this.httpClient.get<Array<Offer>>(this.url + '/my');
  }

  consider(offerId: number, accepted: boolean): Observable<Offer> {
    return this.httpClient.put<Offer>(this.url + '/' + offerId, null, {
      params: {
        accepted: String(accepted)
      }
    });
  }

  delete(offerId: number) {
    return this.httpClient.delete(this.url + '/' + offerId);
  }
}
