import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicinaDetallePageRoutingModule } from './medicina-detalle-routing.module';

import { MedicinaDetallePage } from './medicina-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicinaDetallePageRoutingModule
  ],
  declarations: [MedicinaDetallePage]
})
export class MedicinaDetallePageModule {}
