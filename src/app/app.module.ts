// Angular core imports
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Ionic imports
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';

// Firebase imports
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire/compat';

// Environment
import { environment } from 'src/environments/environment';

// App components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Vid1Component } from './component/vid1/vid1.component';
import { Vid2Component } from './component/vid2/vid2.component';
import { AgregarHorarioComponent } from './agregar-horario/agregar-horario.component';
import { EditarHorarioComponent } from './editar-horario/editar-horario.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MapModalComponent } from './component/map-modal/map-modal.component';


@NgModule({
  declarations: [AppComponent, Vid1Component, Vid2Component, AgregarHorarioComponent, EditarHorarioComponent, MapModalComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
