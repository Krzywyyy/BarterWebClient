import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NetworkProperties } from './network-properties';
import { Offer } from '../model/domain/offer';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  url = NetworkProperties.URL + 'offers';

  constructor(private httpClient: HttpClient) { }

  save(offer: Offer): Observable<Offer> {
    return this.httpClient.post<Offer>(this.url, offer);
  }
}
