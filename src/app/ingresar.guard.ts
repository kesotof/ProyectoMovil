import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { NavController } from '@ionic/angular';

export const ingresarGuard: CanActivateFn = (route, state) => {
  const navCtrl = inject(NavController);

  if (localStorage.getItem("ingresado")) {
    return true;
  } else {
    navCtrl.navigateRoot('login');
    return false;
  }
};
