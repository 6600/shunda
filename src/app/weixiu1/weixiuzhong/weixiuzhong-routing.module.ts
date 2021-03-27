import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeixiuzhongPage } from './weixiuzhong.page';

const routes: Routes = [
  {
    path: '',
    component: WeixiuzhongPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeixiuzhongPageRoutingModule {}
