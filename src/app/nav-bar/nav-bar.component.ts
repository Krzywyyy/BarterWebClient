import { Component, OnInit } from '@angular/core';
import { User } from '../model/domain/user';
import { UserService } from '../services/user-service/user.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { RegisterComponent } from '../register/register.component';

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
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  signIn() {
    this.userService.login(this.user);
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

  authorized(): boolean {
    return sessionStorage.getItem('token') != null;
  }
}
