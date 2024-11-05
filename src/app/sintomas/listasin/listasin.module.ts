import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListasinPageRoutingModule } from './listasin-routing.module';
import { ListasinPage } from './listasin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListasinPageRoutingModule
  ],
  declarations: [ListasinPage]
})
export class ListasinPageModule {}
