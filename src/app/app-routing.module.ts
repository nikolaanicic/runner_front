import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { NonAuthGuard } from './guards/non-auth.guard';
import { OrderListComponent } from './order-list/order-list.component';
import { PendingRequestsComponent } from './pending-requests/pending-requests.component';
import { CreateItemComponent } from './create-item/create-item.component';
import { TimerGuard } from './guards/timer.guard';
import { CurrentOrderComponent } from './current-order/current-order.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent, canActivate: [NonAuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NonAuthGuard] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, TimerGuard],
  },
  {
    path: 'allOrders',
    component: OrderListComponent,
    canActivate: [AuthGuard, TimerGuard],
  },
  {
    path: 'history',
    component: OrderListComponent,
    canActivate: [AuthGuard, TimerGuard],
  },
  {
    path: 'requests',
    component: PendingRequestsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'pendingOrders',
    component: OrderListComponent,
    canActivate: [AuthGuard, TimerGuard],
  },
  {
    path: 'currentOrder',
    component: CurrentOrderComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'addItem',
    component: CreateItemComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard, TimerGuard],
  },
  {
    path: '**',
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
