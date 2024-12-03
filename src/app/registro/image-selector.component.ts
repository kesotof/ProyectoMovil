import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { FirebaseStorageService } from 'src/service/firebase-storage.service';

@Component({
  selector: 'app-image-selector',
  template: `
    <ion-list>
      <ion-item *ngFor="let image of defaultImages" (click)="selectImage(image)">
        <ion-avatar slot="start">
          <img [src]="image" />
        </ion-avatar>
        <ion-label>Seleccionar imagen</ion-label>
      </ion-item>
    </ion-list>
  `
})
export class ImageSelectorComponent implements OnInit {
  defaultImages: string[] = [];

  constructor(
    private popoverController: PopoverController,
    private storageService: FirebaseStorageService
  ) {}

  async ngOnInit() {
    try {
      this.defaultImages = await this.storageService.getDefaultImages();
    } catch (error) {
      console.error('Error cargando imágenes:', error);
    }
  }

  selectImage(image: string) {
    this.popoverController.dismiss({
      image: image
    });
  }
}
