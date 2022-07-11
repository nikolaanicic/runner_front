import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../app.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, private auth: LoginService) {}

  ngOnInit(): void {}

  onProfileClick() {
    this.navigate('profile');
  }

  onCurrentOrderClick() {
    this.router.navigate(['/currentOrder'], {
      state: { orderMode: 'Ordering' },
    });
  }

  onAllOrdersClick() {
    this.router.navigate(['/allOrders'], { state: { mode: 'all' } });
  }

  onHistoryClick() {
    this.router.navigate(['/history'], { state: { mode: 'history' } });
  }

  onPendingOrdersClick() {
    this.router.navigate(['/pendingOrders']);
  }

  onPendingRequestsClick() {
    this.navigate('requests');
  }

  onAddItemClick() {
    this.navigate('addItem');
  }

  private navigate(route: string) {
    this.router.navigate([`/${route}`]);
  }

  getRole() {
    return this.auth.getRole();
  }
}
