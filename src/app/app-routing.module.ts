import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from './containers/default-layout';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splashPage',
    pathMatch: 'full'
  },

  {
    path: '',
    component: DefaultLayoutComponent,
    // data: {
    //   title: 'Dashboard'
    // },
    children: [
      {
        path: 'splashPage',
        loadChildren: () => import('./module/splash-page/splash-page.module').then(m => m.SplashPageModule)
      },
      {
        path: 'identities-explorer',
        loadChildren: () => import('./module/identities-explorer/identities-explorer.module').then(m => m.IdentitiesExplorerModule)
      },
      {
        path: 'home',
        loadChildren: () => import('./module/home/home.module').then(h => h.HomeModule)
        // data: {
        //   title: 'Ho
        // }
      },
      {
        path: 'forgotPassword',
        loadChildren: () => import('./module/forgot-password/forgot-password.module').then(f => f.ForgotPasswordModule)
      },
      {
        path: 'forgotPasswordOtp',
        loadChildren: () => import('./module/forgot-password-otp/forgot-password-otp.module').then(n => n.ForgotPasswordOtpModule)
      },
      {
        path: 'resetPassword',
        loadChildren: () => import('./module/reset-password/reset-password.module').then(r => r.ResetPasswordModule)
      },
      {
        path: 'preference-page',
        loadChildren: () => import('./module/preference-page/preference-page.module').then(p => p.PreferencePageModule)
      },
      {
        path: '2fa-page',
        loadChildren: () => import('./module/two-fa-page/two-fa-page.module').then(p => p.TwoFaPageModule)
      },
      {
        path: 'setPassword',
        loadChildren: () => import('./module/set-password/set-password.module').then(p => p.SetPasswordModule)
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
