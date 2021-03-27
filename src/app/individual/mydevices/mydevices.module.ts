import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MydevicesPageRoutingModule } from './mydevices-routing.module';

import { MydevicesPage } from './mydevices.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MydevicesPageRoutingModule
  ],
  declarations: [MydevicesPage]
})
export class MydevicesPageModule {}
