import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { Vid1Component } from './component/vid1/vid1.component';
import { Vid2Component } from './component/vid2/vid2.component';
import { AgregarHorarioComponent } from './agregar-horario/agregar-horario.component';
import { EditarHorarioComponent } from './editar-horario/editar-horario.component';

@NgModule({
  declarations: [AppComponent, Vid1Component, Vid2Component, AgregarHorarioComponent, EditarHorarioComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideFirebaseApp(() => initializeApp({"projectId":"ionictestapp-6355f","appId":"1:917555013625:web:2f6ceeb25d578f020bbf28","storageBucket":"ionictestapp-6355f.appspot.com","apiKey":"AIzaSyAs23Te1KQpkadfclC7nKlUoebPqpTgbDg","authDomain":"ionictestapp-6355f.firebaseapp.com","messagingSenderId":"917555013625"})), provideAuth(() => getAuth()), provideDatabase(() => getDatabase())],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
