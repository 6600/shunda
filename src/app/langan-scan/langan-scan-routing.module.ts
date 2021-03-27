import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LanganScanPage } from './langan-scan.page';

const routes: Routes = [
  {
    path: '',
    component: LanganScanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LanganScanPageRoutingModule {}
