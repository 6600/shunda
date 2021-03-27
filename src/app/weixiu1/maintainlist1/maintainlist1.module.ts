import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Maintainlist1PageRoutingModule } from './maintainlist1-routing.module';

import { Maintainlist1Page } from './maintainlist1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Maintainlist1PageRoutingModule
  ],
  declarations: [Maintainlist1Page]
})
export class Maintainlist1PageModule {}
