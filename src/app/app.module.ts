import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Storage } from '@ionic/storage';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Vid1Component } from './component/vid1/vid1.component';
import { Vid2Component } from './component/vid2/vid2.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ParacetamolComponent } from './componetW/paracetamol/paracetamol.component';

@NgModule({
  declarations: [AppComponent,Vid1Component,Vid2Component,ParacetamolComponent,],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ 
    provide: RouteReuseStrategy,
    useClass: IonicRouteStrategy},
    Storage],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppModule {}
