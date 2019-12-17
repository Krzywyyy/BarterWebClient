import {Injectable} from '@angular/core';
import {error} from 'util';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() {
  }

  getUserLocation(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
          resolve({latitude: resp.coords.latitude, longitude: resp.coords.longitude});
        },
        err => {
          reject(error);
        });
    });
  }
}
