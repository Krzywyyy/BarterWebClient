import { Component, OnInit } from '@angular/core';
import { User } from '../model/domain/user';
import { UserService } from '../services/user-service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  user:User = new User();

  constructor(
    private httpClient: UserService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.httpClient.login(this.user);
  }

  authorized(): boolean{
    return sessionStorage.getItem('token') != null;
  }
}
