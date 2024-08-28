import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuentaaPage } from './cuentaa.page';

const routes: Routes = [
  {
    path: '',
    component: CuentaaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuentaaPageRoutingModule {}
