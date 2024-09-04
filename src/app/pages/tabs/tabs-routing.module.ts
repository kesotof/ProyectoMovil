import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: './../../pages/menu/menu.module',
        pathMatch: 'full'
      },
      {
        path: 'wiki',
        loadChildren: () => import('./../../pages/wiki/wiki.module').then( m => m.WikiPageModule)
      },
      {
        path: 'menu',
        loadChildren: () => import('./../../pages/menu/menu.module').then( m => m.MenuPageModule)
      },
      {
        path: 'calendar',
        loadChildren: () => import('./../../pages/calendar/calendar.module').then( m => m.CalendarPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
