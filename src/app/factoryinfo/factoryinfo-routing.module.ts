import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FactoryinfoPage } from './factoryinfo.page';

const routes: Routes = [
  {
    path: '',
    component: FactoryinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FactoryinfoPageRoutingModule {}
