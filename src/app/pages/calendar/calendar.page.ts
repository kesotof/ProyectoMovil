import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  constructor( private router:Router, private toastController: ToastController) {}
  navigate(){
  this.router.navigate(['/calendario'])
  }

  async presentToast(position:'middle') {
    const toast = await this.toastController.create({
      message: 'Esta funcion estara disponible en futuras actualizaciones!',
      duration: 1700,
      position: position,
    });

    await toast.present();
  }

  ngOnInit() {
  }

}
