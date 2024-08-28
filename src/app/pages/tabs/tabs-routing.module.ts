import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { ingresarGuard } from 'src/app/ingresar.guard';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'wiki',
        loadChildren: () => import('./../../pages/wiki/wiki.module').then( m => m.WikiPageModule),
        canActivate: [ingresarGuard]
      },
      {
        path: 'menu',
        loadChildren: () => import('./../../pages/menu/menu.module').then( m => m.MenuPageModule),
        canActivate: [ingresarGuard]
      },
      {
        path: 'calendar',
        loadChildren: () => import('./../../pages/calendar/calendar.module').then( m => m.CalendarPageModule),
        canActivate: [ingresarGuard]
      },
      {
        path: 'cuenta',
        loadChildren: () => import('./../../pages/cuenta/cuenta.module').then( m => m.CuentaPageModule),
        canActivate: [ingresarGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
