import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyaccessoryPageRoutingModule } from './myaccessory-routing.module';

import { MyaccessoryPage } from './myaccessory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyaccessoryPageRoutingModule
  ],
  declarations: [MyaccessoryPage]
})
export class MyaccessoryPageModule {}
