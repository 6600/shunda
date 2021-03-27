import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaintainrecordPageRoutingModule } from './maintainrecord-routing.module';

import { MaintainrecordPage } from './maintainrecord.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaintainrecordPageRoutingModule
  ],
  declarations: [MaintainrecordPage]
})
export class MaintainrecordPageModule {}
