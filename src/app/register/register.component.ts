import {Component, OnInit} from '@angular/core';
import {User} from '../model/domain/user';
import {UserService} from '../services/api/user.service';
import {MatDialog} from '@angular/material';
import {FailedRegistrationDataDialogComponent} from '../dialogs/failed-registration-data-dialog/failed-registration-data-dialog.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  repassword: string;
  registered: boolean;

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.registered = false;
  }

  emailIsValid(): boolean {
    if (this.user.email !== null && this.user.email !== undefined) {
      if (this.user.email.toLowerCase().match('[a-z]+(\\.)[a-z]+[0-9]*(@student)(\\.)(wat)(\\.)(edu)(\\.)(pl)') !== null) {
        return true;
      }
    }
    return false;
  }

  passwordsMatches(): boolean {
    if (this.repassword !== null) {
      return this.user.password === this.repassword;
    }
  }

  signUp() {
    if (this.emailIsValid() && this.passwordsMatches()) {
      this.userService.register(this.user).subscribe(() => {
        this.registered = true;
      });
    } else {
      this.dialog.open(FailedRegistrationDataDialogComponent);
    }
  }

  userRegistered(): boolean {
    return this.registered;
  }
}
