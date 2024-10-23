import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MedicinasPageRoutingModule } from './medicinas-routing.module';
import { MedicinasPage } from './medicinas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicinasPageRoutingModule
  ],
  declarations: [MedicinasPage]
})
export class MedicinasPageModule {}
