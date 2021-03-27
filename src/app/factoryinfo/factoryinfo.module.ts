import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FactoryinfoPageRoutingModule } from './factoryinfo-routing.module';

import { FactoryinfoPage } from './factoryinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FactoryinfoPageRoutingModule
  ],
  declarations: [FactoryinfoPage]
})
export class FactoryinfoPageModule {}
