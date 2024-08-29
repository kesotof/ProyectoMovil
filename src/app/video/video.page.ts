import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Vid1Component } from './../component/vid1/vid1.component';
import { Vid2Component } from '../component/vid2/vid2.component';

@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})
export class VideoPage {

  constructor(private modalController: ModalController) { }

  async openModal1() {
    const modal = await this.modalController.create({
      component: Vid1Component
    });
    return await modal.present();
  }
  async openModal2() {
    const modal = await this.modalController.create({
      component: Vid2Component
    });
    return await modal.present();
  }
}
