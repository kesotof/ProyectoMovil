import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesinPageRoutingModule } from './detallesin-routing.module';

import { DetallesinPage } from './detallesin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesinPageRoutingModule
  ],
  declarations: [DetallesinPage]
})
export class DetallesinPageModule {}
