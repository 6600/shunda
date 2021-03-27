import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LanganInfoPage } from './langan-info.page';

const routes: Routes = [
  {
    path: '',
    component: LanganInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LanganInfoPageRoutingModule {}
