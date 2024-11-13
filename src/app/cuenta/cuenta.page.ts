import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutUserUseCase } from 'src/use-cases/logout-user.usecase';
import { UpdateUserNameUseCase } from 'src/use-cases/updateName-user.usecase';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {
  newUserName: string = '';
  currentUserName: string | null = '';

  constructor(
    private router: Router,
    private logoutUserUC: LogoutUserUseCase,
    private updateUserNameUC: UpdateUserNameUseCase
  ) {}

  ngOnInit() {
    this.loadUserName();
  }

  async loadUserName() {
    this.currentUserName = await this.updateUserNameUC.getUserName();
    this.newUserName = this.currentUserName || '';
  }

  async updateUserName() {
    try {
      const result = await this.updateUserNameUC.updateUserName(this.newUserName);
      if (result) {
        console.log('Nombre de usuario actualizado correctamente');
      } else {
        console.error('Error al actualizar el nombre de usuario');
      }
    } catch (error) {
      console.error('Error al actualizar el nombre de usuario:', error);
    }
  }

  async onLogout() {
    try {
      let logoutResult = await this.logoutUserUC.logout();
      if (!logoutResult) {
        throw Error("Algo fallo!");
      } else {
        this.router.navigate(['/splash']);
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

}
