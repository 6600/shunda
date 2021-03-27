import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyaccessoryPage } from './myaccessory.page';

const routes: Routes = [
  {
    path: '',
    component: MyaccessoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyaccessoryPageRoutingModule {}
