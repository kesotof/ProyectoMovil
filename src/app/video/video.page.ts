import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModallComponent } from './modall/modall.component';

@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})
export class VideoPage {

  constructor(private modalController: ModalController) { }

  async openModal() {
    const modal = await this.modalController.create({
      component: ModallComponent
    });
    return await modal.present();
  }
}
