import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesinPage } from './detallesin.page';

const routes: Routes = [
  {
    path: '',
    component: DetallesinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesinPageRoutingModule {}
