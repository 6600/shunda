import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyfactoryPageRoutingModule } from './myfactory-routing.module';

import { MyfactoryPage } from './myfactory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyfactoryPageRoutingModule
  ],
  declarations: [MyfactoryPage]
})
export class MyfactoryPageModule {}
