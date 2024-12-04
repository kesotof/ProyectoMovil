import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarcomPage } from './agregarcom.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarcomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarcomPageRoutingModule {}
