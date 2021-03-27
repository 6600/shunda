import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeixiuzhongPageRoutingModule } from './weixiuzhong-routing.module';

import { WeixiuzhongPage } from './weixiuzhong.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeixiuzhongPageRoutingModule
  ],
  declarations: [WeixiuzhongPage]
})
export class WeixiuzhongPageModule {}
