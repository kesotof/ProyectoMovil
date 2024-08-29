import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-vid1',
  templateUrl: './vid1.component.html',
  styleUrls: ['./vid1.component.scss'],
})
export class Vid1Component{

  constructor(private modalController: ModalController) {}

  cerrarModal() {
    this.modalController.dismiss();
  }

}
