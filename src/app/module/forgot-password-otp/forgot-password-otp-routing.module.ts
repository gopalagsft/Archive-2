import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordOtpComponent } from './forgot-password-otp.component';


const routes: Routes = [{
  path: '',
  component: ForgotPasswordOtpComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotPasswordOtpRoutingModule { }
