import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuweixiuPage } from './quweixiu.page';

const routes: Routes = [
  {
    path: '',
    component: QuweixiuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuweixiuPageRoutingModule {}
