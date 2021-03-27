import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LanganAddPage } from './langan-add.page';

const routes: Routes = [
  {
    path: '',
    component: LanganAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LanganAddPageRoutingModule {}
