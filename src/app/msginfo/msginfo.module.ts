import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MsginfoPageRoutingModule } from './msginfo-routing.module';

import { MsginfoPage } from './msginfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MsginfoPageRoutingModule
  ],
  declarations: [MsginfoPage]
})
export class MsginfoPageModule {}
