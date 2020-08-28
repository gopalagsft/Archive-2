import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IdentitiesExplorerComponent } from './identities-explorer.component';

const routes: Routes = [
  {
    path: '',
    component: IdentitiesExplorerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdentitiesExplorerRoutingModule { }
