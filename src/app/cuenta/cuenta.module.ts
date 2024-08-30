import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { IonicModule } from '@ionic/angular';
import { MatCardModule } from '@angular/material/card';

import { CuentaPageRoutingModule } from './cuenta-routing.module';

import { CuentaPage } from './cuenta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatCardModule,
    MatIconModule,
    CuentaPageRoutingModule
  ],
  declarations: [CuentaPage]
})
export class CuentaPageModule {}
