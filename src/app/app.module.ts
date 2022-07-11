import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { PopUpHeaderComponent } from './pop-up-header/pop-up-header.component';
import { OrderComponent } from './order/order.component';
import { OrderListComponent } from './order-list/order-list.component';
import { PendingRequestsComponent } from './pending-requests/pending-requests.component';
import { CreateItemComponent } from './create-item/create-item.component';
import { CurrentOrderComponent } from './current-order/current-order.component';
import { ItemComponent } from './item/item.component';
import { ItemListComponent } from './item-list/item-list.component';
import { BasketComponent } from './basket/basket.component';
import { JwtModule } from '@auth0/angular-jwt';
import { getToken } from './services/common/commonFunc';
import { AuthGuard } from './guards/auth.guard';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  FacebookLoginProvider,
} from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    ProfileComponent,
    PopUpHeaderComponent,
    OrderComponent,
    OrderListComponent,
    PendingRequestsComponent,
    CreateItemComponent,
    CurrentOrderComponent,
    ItemComponent,
    ItemListComponent,
    BasketComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({ config: { tokenGetter: getToken } }),
    SocialLoginModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('344760101015469'),
          },
        ],
        onError: (err) => console.log(err),
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
