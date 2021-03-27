import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaintainlistPageRoutingModule } from './maintainlist-routing.module';

import { MaintainlistPage } from './maintainlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaintainlistPageRoutingModule
  ],
  declarations: [MaintainlistPage]
})
export class MaintainlistPageModule {}
