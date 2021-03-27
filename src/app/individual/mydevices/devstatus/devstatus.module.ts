import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevstatusPageRoutingModule } from './devstatus-routing.module';

import { DevstatusPage } from './devstatus.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevstatusPageRoutingModule
  ],
  declarations: [DevstatusPage]
})
export class DevstatusPageModule {}
