import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public static isAuthorized(): boolean {
    return sessionStorage.getItem('token') != null;
  }
}
