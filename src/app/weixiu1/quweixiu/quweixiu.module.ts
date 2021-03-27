import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuweixiuPageRoutingModule } from './quweixiu-routing.module';

import { QuweixiuPage } from './quweixiu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuweixiuPageRoutingModule
  ],
  declarations: [QuweixiuPage]
})
export class QuweixiuPageModule {}
