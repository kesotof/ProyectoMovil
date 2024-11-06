import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicinasPage } from './medicinas.page';

const routes: Routes = [
  {
    path: '',
    component: MedicinasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicinasPageRoutingModule {}
