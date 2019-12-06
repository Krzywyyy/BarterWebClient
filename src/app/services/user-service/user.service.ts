import { Injectable } from '@angular/core';

import { User } from 'src/app/model/domain/user';
import { HttpClient } from '@angular/common/http';
import { NetworkProperties } from '../network-properties';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  login(user: User) {
    return this.httpClient.post(NetworkProperties.URL + 'users/login', user, { observe: 'response' })
      .subscribe(response => {
        sessionStorage.setItem('token', response.headers.get('Authorization'));
      })
  }

  register(user: User) {
    return this.httpClient.post(NetworkProperties.URL + 'users/register', user).subscribe();
  }
}
