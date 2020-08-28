import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreferencePageComponent } from './preference-page.component';


const routes: Routes = [
  {
    path: '',
    component: PreferencePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreferencePageRoutingModule { }
