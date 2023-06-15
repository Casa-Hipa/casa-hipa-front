import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { PageLoginComponent } from './page-login/page-login.component';
import { PageRegisterComponent } from './page-register/page-register.component';
import { PageLockscreenComponent } from './page-lockscreen/page-lockscreen.component';
import { PageForgotPasswordComponent } from './page-forgot-password/page-forgot-password.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PageForbiddonErrorComponent } from './page-forbiddon-error/page-forbiddon-error.component';
import { ErrorPaymentComponent } from './error-payment/error-payment.component';
import { SuccessPaymentComponent } from './success-payment/success-payment.component';
import { SuccessSellComponent } from './success-sell/success-sell.component';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      { path: '', redirectTo: 'page-login', pathMatch: 'full' },
      {
        path: 'page-login',
        component: PageLoginComponent,
        data: { title: 'Login :: Casa Hipa' },
      },
      {
        path: 'success-payment',
        component: SuccessPaymentComponent,
        data: { title: ':: Casa Hipa :: Sucess Payment ::' },
      },
      {
        path: 'success-sell',
        component: SuccessSellComponent,
        data: { title: ':: Casa Hipa :: Sucess Sell ::' },
      },
      {
        path: 'error-payment',
        component: ErrorPaymentComponent,
        data: { title: ':: Casa Hipa :: Error Payment ::' },
      },
      {
        path: 'page-register',
        component: PageRegisterComponent,
        data: { title: 'Register :: Casa Hipa' },
      },
      {
        path: 'page-lockscreen',
        component: PageLockscreenComponent,
        data: { title: 'Lock Screen :: Casa Hipa' },
      },
      {
        path: 'page-forgot-password',
        component: PageForgotPasswordComponent,
        data: { title: 'Forgot Password :: Casa Hipa' },
      },
      {
        path: 'page-404',
        component: PageNotFoundComponent,
        data: { title: 'Page-404 :: Casa Hipa' },
      },
      {
        path: 'page-403',
        component: PageForbiddonErrorComponent,
        data: { title: 'Page-403 :: Casa Hipa' },
      },

    ],
  },
];

export const routing = RouterModule.forChild(routes);
