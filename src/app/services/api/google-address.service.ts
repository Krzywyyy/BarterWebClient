import {Injectable} from '@angular/core';
import {NetworkProperties} from '../network-properties';
import {Observable} from 'rxjs';
import {Result} from '../../model/maps/result';
import {HttpBackend, HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GoogleAddressService {

  url = NetworkProperties.GOOGLE_URL;
  private httpClient: HttpClient;
  constructor(handler: HttpBackend) {
    this.httpClient = new HttpClient(handler);
  }

  getCoordinates(address: string, apiKey: string): Observable<Result> {
    return this.httpClient.get<Result>(this.url, {
      params: {
        address,
        key: apiKey
      }
    });
  }
}
