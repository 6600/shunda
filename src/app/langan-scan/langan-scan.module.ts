import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LanganScanPageRoutingModule } from './langan-scan-routing.module';

import { LanganScanPage } from './langan-scan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LanganScanPageRoutingModule
  ],
  declarations: [LanganScanPage]
})
export class LanganScanPageModule {}
