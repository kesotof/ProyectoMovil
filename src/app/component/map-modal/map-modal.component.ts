import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent {

  @Input() name: string = '';

  constructor(private modalController: ModalController) {}

  confirm() {
    this.modalController.dismiss(this.name, 'confirm');
  }

  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }

}
