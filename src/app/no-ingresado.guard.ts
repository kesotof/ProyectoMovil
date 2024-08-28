import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { NavController } from '@ionic/angular';

export const noIngresadoGuard: CanActivateFn = (route, state) => {
  const navCtrl = inject(NavController);

  if (localStorage.getItem("ingresado")) {
    navCtrl.navigateRoot('tabs');
    return false;
  } else {
    return true;
  }
};
