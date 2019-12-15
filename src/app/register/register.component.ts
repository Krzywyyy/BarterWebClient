import {Component, OnInit} from '@angular/core';
import {User} from '../model/domain/user';
import {UserService} from '../services/api/user.service';
import {MatDialog} from '@angular/material';
import {FailedRegistrationDataDialogComponent} from '../dialogs/failed-registration-data-dialog/failed-registration-data-dialog.component';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  repassword: string;
  registered: boolean;
  registerForm: FormGroup;
  submitted: boolean;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.registered = false;
    this.submitted = false;

    this.registerForm = this.formBuilder.group({
      userEmail: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z]+(\\.)[a-z]+[0-9]*(@student)(\\.)(wat)(\\.)(edu)(\\.)(pl)')
      ]),
      userPassword: new FormControl('', Validators.required),
      userRepassword: new FormControl('', Validators.required)
    }, {
      validators: passwordMatchesValidator
    });
  }

  get userEmail() {
    return this.registerForm.controls.userEmail;
  }

  get userPassword() {
    return this.registerForm.controls.userPassword;
  }

  get userRepassword() {
    return this.registerForm.controls.userRepassword;
  }

  emailIsInvalid(): boolean {
    if (this.user.email === undefined) {
      return false;
    }
    if (this.user.email !== null) {
      if (this.user.email.length === 0) {
        return false;
      } else if (this.user.email.toLowerCase().match('[a-z]+(\\.)[a-z]+[0-9]*(@student)(\\.)(wat)(\\.)(edu)(\\.)(pl)') !== null) {
        return false;
      }
      return true;
    }
  }

  passwordsMatches(): boolean {
    if (this.repassword !== null) {
      return this.user.password === this.repassword;
    }
  }

  signUp() {
    // if (this.emailIsInvalid() && this.passwordsMatches()) {
    //   this.userService.register(this.user).subscribe(() => {
    //     this.registered = true;
    //   });
    // } else {
    //   this.dialog.open(FailedRegistrationDataDialogComponent);
    // }

    this.submitted = true;
    console.log(this.registerForm.errors);
    if (this.registerForm.invalid) {
      return;
    }

    console.log(this.registerForm.value);
  }

  userRegistered(): boolean {
    return this.registered;
  }
}

export const passwordMatchesValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const userPassword = control.get('userPassword');
  const userRepassword = control.get('userRepassword');

  return userPassword && userRepassword && userPassword.value === userRepassword.value ? null : {passwordsNotMatch: true};
};
