import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintainlistPage } from './maintainlist.page';

const routes: Routes = [
  {
    path: '',
    component: MaintainlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintainlistPageRoutingModule {}
