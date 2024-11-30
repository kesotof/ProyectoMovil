import { Component, Input, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapComponent } from '../map/map.component';


@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent {

  @Input() name: string = '';

  @ViewChild(MapComponent) currentMap: MapComponent | null = null;


  constructor(private modalController: ModalController) { }

  // when modal is opened, this will be called
  ionViewDidEnter() {
  }


  public gpsLocation: string = "111";

  confirm() {
    this.modalController.dismiss(this.name, 'confirm');
  }

  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  SMButtonClicked() {
    this.gpsLocation += "SM";
  }

  AmbulanceButtonClicked() {
    throw new Error('Method not implemented.');
  }

}
