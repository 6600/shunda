import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LanganAddPageRoutingModule } from './langan-add-routing.module';

import { LanganAddPage } from './langan-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LanganAddPageRoutingModule
  ],
  declarations: [LanganAddPage]
})
export class LanganAddPageModule {}
