import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-vid2',
  templateUrl: './vid2.component.html',
  styleUrls: ['./vid2.component.scss'],
})
export class Vid2Component  {

  constructor(private modalController: ModalController) {}

  cerrarModal() {
    this.modalController.dismiss();
  }

}
