import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyfactoryPage } from './myfactory.page';

const routes: Routes = [
  {
    path: '',
    component: MyfactoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyfactoryPageRoutingModule {}
