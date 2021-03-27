import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MydevicesPage } from './mydevices.page';

const routes: Routes = [
  {
    path: '',
    component: MydevicesPage
  },
  {
    path: 'devstatus',
    loadChildren: () => import('./devstatus/devstatus.module').then( m => m.DevstatusPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MydevicesPageRoutingModule {}
