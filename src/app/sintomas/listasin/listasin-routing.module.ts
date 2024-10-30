import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListasinPage } from './listasin.page';

const routes: Routes = [
  {
    path: '',
    component: ListasinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListasinPageRoutingModule {}