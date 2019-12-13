import {Component, OnInit} from '@angular/core';
import {User} from '../model/domain/user';
import {UserService} from '../services/api/user.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {RegisterComponent} from '../register/register.component';
import * as jwt_decode from 'jwt-decode';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  user: User = new User();
  registration: MatDialogRef<any>;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  getUsername() {
    const decoded = jwt_decode(sessionStorage.getItem('token'));
    const userEmail = decoded.sub;
    return userEmail.split('@')[0].replace('.', ' ');
  }

  signIn() {
    this.userService.login(this.user).subscribe(response => {
      sessionStorage.setItem('token', response.headers.get('Authorization').split(' ')[1]);
    });
  }

  signUp() {
    if (!this.registration) {
      this.registration = this.dialog.open(RegisterComponent, {
        width: '350px'
      });

      this.registration.afterClosed().subscribe(
        () => this.registration = undefined
      );
    }
  }

  signOut() {
    sessionStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }

  authorized(): boolean {
    return sessionStorage.getItem('token') != null;
  }
}
