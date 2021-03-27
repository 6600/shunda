import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevstatusPage } from './devstatus.page';

const routes: Routes = [
  {
    path: '',
    component: DevstatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DevstatusPageRoutingModule {}
