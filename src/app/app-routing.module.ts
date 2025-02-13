import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule),
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
  },
  {
    path: 'cuenta',
    loadChildren: () => import('./cuenta/cuenta.module').then(m => m.CuentaPageModule),
  },
  {
    path: 'video',
    loadChildren: () => import('./video/video.module').then(m => m.VideoPageModule),
  },
  {
    path: 'calendar',
    loadChildren: () => import('./pages/calendar/calendar.module').then( m => m.CalendarPageModule),
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then(m => m.SplashPageModule)
  },
  {
    path: 'sintomas/listasin',
    loadChildren: () => import('./sintomas/listasin/listasin.module').then(m => m.ListasinPageModule)
  },
  {
    path: 'sintomas/sintoma-detalle/:id',
    loadChildren: () => import('./sintomas/detallesin/detallesin.module').then(m => m.DetallesinPageModule)
  },
  {
    path: 'foro/comentario/:id/:nombre',
    loadChildren: () => import('./foro/comentario/comentario.module').then(m => m.ComentarioPageModule)
  },
  {
    path: 'foro/agregarcom/:id/:nombre',
    loadChildren: () => import('./foro/agregarcom/agregarcom.module').then(m => m.AgregarcomPageModule)
  },
  {
    path: 'medicinas',
    loadChildren: () => import('./medicinas/medicinas.module').then(m => m.MedicinasPageModule)
  },
  {
    path: 'medicina-detalle/:id',
    loadChildren: () => import('./medicina-detalle/medicina-detalle.module').then(m => m.MedicinaDetallePageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
