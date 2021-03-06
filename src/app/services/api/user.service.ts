import { Injectable } from '@angular/core';

import { User } from 'src/app/model/domain/user';
import { HttpClient } from '@angular/common/http';
import { NetworkProperties } from '../network-properties';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = NetworkProperties.URL + 'users';

  constructor(private httpClient: HttpClient) { }

  login(user: User) {
    return this.httpClient.post(this.url + '/login', user, { observe: 'response' });
  }

  register(user: User) {
    return this.httpClient.post(this.url + '/register', user);
  }
}
