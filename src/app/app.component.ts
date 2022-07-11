import { Component } from '@angular/core';
import { LoginService } from './services/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'front_app';

  constructor(private auth: LoginService) {}

  isAuthenticated() {
    return this.auth.isLoggedIn() ?? false;
  }
}
