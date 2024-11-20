import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  
  constructor( private router:Router) {}
    navigate(){
    this.router.navigate(['/cuenta'])
  }

  @ViewChild(IonModal) modal!: IonModal;

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

  openMapButtonClicked() {
    console.log('Map button clicked!');
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }
}
