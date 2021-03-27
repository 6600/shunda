import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Maintainlist1Page } from './maintainlist1.page';

const routes: Routes = [
  {
    path: '',
    component: Maintainlist1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Maintainlist1PageRoutingModule {}
