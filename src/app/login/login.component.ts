import { Component, NgZone, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/login/login.service';
import { NotificationService } from '../services/notification/notification.service';
import { Router } from '@angular/router';
import { TokenResponse } from '../../models/login/TokenResponse';
import { OrderService } from '../services/order/order.service';

declare global {
  interface Window {
    googleLogin: any;
  }
}

window.googleLogin = window.googleLogin || {};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../app.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group(this.createFormObj());
  constructor(
    private loginService: LoginService,
    private fb: UntypedFormBuilder,
    private notify: NotificationService,
    private router: Router,
    private orderService: OrderService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    window.googleLogin = (response: any) => {
      this.googleLogin(response.credential);
    };
  }

  onSubmit() {
    this.loginService.login(this.loginForm.value).subscribe({
      next: (value: TokenResponse) => {
        this.loginService.parseValidTokenResponse(value);
        this.router.navigate(['/dashboard']);
        if (this.loginService.getRole() === 'Consumer') {
          this.orderService.initConnection();
          this.orderService.addTimerPushDataListener();
        }
      },
      error: (error) => this.notify.showNotification(error),
    });
  }

  googleLogin = (token: string) => {
    this.loginService.googleLogin(token).subscribe({
      next: (value) => {
        console.log(value);
        this.ngZone.run(() => {
          this.loginService.parseValidTokenResponse(value);
          this.router.navigate(['/dashboard']);
          if (this.loginService.getRole() === 'Consumer') {
            this.orderService.initConnection();
            this.orderService.addTimerPushDataListener();
          }
        });
      },
      error: (error) => this.notify.showNotification(error),
    });
  };

  createFormObj() {
    return {
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    };
  }
}
