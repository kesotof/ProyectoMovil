import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutUserUseCase } from 'src/use-cases/logout-user.usecase';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage {
  constructor(private router: Router, private logoutUserUC: LogoutUserUseCase) { }

  async onLogout() {
    // remove the user from the session
    try {
      let logoutResult = await this.logoutUserUC.logout();
      if (!logoutResult) {
        throw Error("Algo fallo!");
      }
      else {
        this.router.navigate(['/splash']);
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

}
