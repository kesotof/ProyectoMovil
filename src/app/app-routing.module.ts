import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule),
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule),
  },
  {
    path: 'cuenta',
    loadChildren: () => import('./cuenta/cuenta.module').then( m => m.CuentaPageModule),
  },
  {
    path: 'video',
    loadChildren: () => import('./video/video.module').then( m => m.VideoPageModule),
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'sintomas/listasin',
    loadChildren: () => import('./sintomas/listasin/listasin.module').then(m => m.ListasinPageModule)
  },
  {
    path: 'sintomas/detallesin/:id',
    loadChildren: () => import('./sintomas/listasin/listasin-routing.module').then(m => m.ListasinPageRoutingModule)
  },
  {
    path: 'medicinas',
    loadChildren: () => import('./medicinas/medicinas.module').then( m => m.MedicinasPageModule)
  },
  {
    path: 'medicina-detalle/:id',
    loadChildren: () => import('./medicina-detalle/medicina-detalle.module').then(m => m.MedicinaDetallePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
