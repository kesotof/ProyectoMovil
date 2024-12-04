import { Component, Input, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapComponent } from '../map/map.component';


export interface Coordinates {
  lat: number;
  lng: number;
}


@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent {

  @Input() name: string = '';

  @ViewChild(MapComponent) currentMap: MapComponent | null = null;


  constructor(private modalController: ModalController) { }

  // map inputs
  // Default center to Santiago, Chile
  public mapCenter: Coordinates = {
    lat: -33.4489,
    lng: -70.6693
  };

  // Default zoom level for city view
  public zoom: number = 12; // Default zoom level
  // Generate a random number every 1 second
  public randomNumber: number = 0;

  ngOnInit() {
    this.zoom = 5;
  }
  // Array to hold marker coordinates (hospitals, clinics etc)
  public markers: Coordinates[] = [
    // Example nearby hospital coordinates
    {
      lat: -33.4433,
      lng: -70.6503
    }
  ];

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
    // call a number
    this.callNumber("+56983731400");
  }

  AmbulanceButtonClicked() {
    this.callNumber("+56983731400");
  }

  private callNumber(phoneNumber:string): void {
    try {
      window.location.href = `tel:${phoneNumber}`;
    } catch (error) {
      console.error('Error making phone call:', error);
    }
  }

}
