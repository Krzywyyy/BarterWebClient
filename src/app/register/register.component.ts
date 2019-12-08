import { Component, TemplateRef, ViewChildren } from '@angular/core';
import { User } from '../model/domain/user';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material';
import { FailedRegistrationDataDialogComponent } from '../dialogs/failed-registration-data-dialog/failed-registration-data-dialog.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user: User = new User();
  repassword: string;
  @ViewChildren('invalidData') invalidDataDialog: TemplateRef<any>;


  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  emailIsValid() {
    if (this.user.email != null) {
      return this.user.email.toLowerCase().match('[a-z]+(.)[a-z]+[0-9]*(@student.wat.edu.pl)');
    }
  }

  passwordsMatches() {
    if (this.repassword != null) {
      return this.user.password === this.repassword;
    }
  }

  signUp() {
    // if (this.emailIsValid && this.passwordsMatches) {
    //   this.userService.register(this.user);
    // } else {
      this.dialog.open(FailedRegistrationDataDialogComponent);
    // }
  }
}
