import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LanganInfoPageRoutingModule } from './langan-info-routing.module';

import { LanganInfoPage } from './langan-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LanganInfoPageRoutingModule
  ],
  declarations: [LanganInfoPage]
})
export class LanganInfoPageModule {}
