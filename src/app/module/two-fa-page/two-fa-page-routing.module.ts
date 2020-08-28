import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TwoFAPageComponent } from './two-fa-page.component';


const routes: Routes = [
  {
    path: '',
    component: TwoFAPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TwoFaPageRoutingModule { }
