import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { MapModalComponent } from '../../component/map-modal/map-modal.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(
    private router: Router,
    private modalController: ModalController) { }
  navigate() {
    this.router.navigate(['/cuenta'])
  }

  ngOnInit() {
  }

  contador: number = 0;
  vasos: number[] = [];
  cantidad: string = '';
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string = "";

  crearVaso() {
    if (this.contador < 1000) {
      this.contador += 200;
      this.vasos.push(200);
      this.cantidad = this.contador === 1000 ? '1 Ltr' : `${this.contador} ml`;
    }
  }

  alertButtons = ['Cerrar'];

  async openMapButtonClicked() {
    console.log('Map button clicked!');
    // we create the modal from the component
    const modal = await this.modalController.create({
      component: MapModalComponent,
      componentProps: {
        name: this.name
      }
    });
    // show the modal
    return await modal.present();

  }
}
