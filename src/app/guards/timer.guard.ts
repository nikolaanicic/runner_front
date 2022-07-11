import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { OrderService } from '../services/order/order.service';
import { TimerService } from '../services/timer/timer.service';

@Injectable({
  providedIn: 'root',
})
export class TimerGuard implements CanActivate {
  constructor(
    private timerService: TimerService,
    private router: Router,
    private auth: LoginService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let role = this.auth.getRole();

    if (role === 'Admin') return true;

    if (this.timerService.getTimeLeft() > 0) {
      this.router.navigate(['/currentOrder']);
      this.timerService.startTimer()(this.timerService.getTimeLeft());
    } else return true;

    return false;
  }
}
