import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintainrecordPage } from './maintainrecord.page';

const routes: Routes = [
  {
    path: '',
    component: MaintainrecordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintainrecordPageRoutingModule {}
