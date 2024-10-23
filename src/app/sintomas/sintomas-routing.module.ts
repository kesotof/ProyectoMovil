import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SintomasPage } from './sintomas.page';

const routes: Routes = [
  {
    path: '',
    component: SintomasPage
  },  {
    path: 'listasin',
    loadChildren: () => import('./listasin/listasin.module').then( m => m.ListasinPageModule)
  },
  {
    path: 'detallesin',
    loadChildren: () => import('./detallesin/detallesin.module').then( m => m.DetallesinPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SintomasPageRoutingModule {}
