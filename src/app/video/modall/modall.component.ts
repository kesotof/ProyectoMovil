import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modall',
  templateUrl: './modall.component.html',
  styleUrls: ['./modall.component.scss'],
})
export class ModallComponent {
  constructor(private modalController: ModalController) {}

  cerrarModal() {
    this.modalController.dismiss();
  }
}
