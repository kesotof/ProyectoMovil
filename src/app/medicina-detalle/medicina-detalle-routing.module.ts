import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicinaDetallePage } from './medicina-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: MedicinaDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicinaDetallePageRoutingModule {}
