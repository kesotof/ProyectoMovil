import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideoPageRoutingModule } from './video-routing.module';

import { VideoPage } from './video.page';
import { MatCardModule } from '@angular/material/card';
import { ModallComponent } from './modall/modall.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatCardModule,
    VideoPageRoutingModule,
    RouterModule.forChild([{ path: '', component: VideoPage }])
  ],
  declarations: [VideoPage,ModallComponent,]
})
export class VideoPageModule {}
