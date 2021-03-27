import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MsginfoPage } from './msginfo.page';

const routes: Routes = [
  {
    path: '',
    component: MsginfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MsginfoPageRoutingModule {}
