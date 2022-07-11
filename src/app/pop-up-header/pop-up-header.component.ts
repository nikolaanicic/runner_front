import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { TimerService } from '../services/timer/timer.service';

@Component({
  selector: 'app-pop-up-header',
  templateUrl: './pop-up-header.component.html',
  styleUrls: ['./pop-up-header.component.css'],
})
export class PopUpHeaderComponent implements OnInit {
  constructor(
    private auth: LoginService,
    private router: Router,
    private timer: TimerService
  ) {}

  ngOnInit(): void {}

  getTimeLeft() {
    return this.timer.getTimeLeft();
  }

  logoutClicked() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  openNav() {
    var nav = document.getElementById('mySidenav');
    nav!.style.width = '250px';
    nav!.classList.add('border');
    nav!.classList.add('border-success');
  }

  closeNav() {
    var nav = document.getElementById('mySidenav');
    nav!.style.width = '0';
    nav!.classList.remove('border');
    nav!.classList.remove('border-success');
  }

  Navigate(route: string) {
    this.router.navigate([`/${route}`]);
    this.closeNav();
  }

  onAllOrdersNavigate() {
    this.router.navigate(['/allOrders']);
    this.closeNav();
  }

  onHistoryNavigate() {
    this.router.navigate(['/history']);
    this.closeNav();
  }

  onPendingOrdersNavigate() {
    this.router.navigate(['/pendingOrders']);
    this.closeNav();
  }

  getRole() {
    return this.auth.getRole();
  }
}
