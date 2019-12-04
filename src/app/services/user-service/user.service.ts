import { Injectable } from '@angular/core';

import { User } from 'src/app/model/domain/user';
import { HttpClient } from '@angular/common/http';
import { NetworkProperties } from '../network-properties';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(user: User) {
    return this.httpClient.post(NetworkProperties.URL + 'users/login', user);
  }

  register(user: User) {
    return this.httpClient.post(NetworkProperties.URL + '/users/register', user);
  }
}
