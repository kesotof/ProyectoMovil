import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManager } from '../../managers/SessionManager';
import { AlertManager } from '../../managers/AlertManager';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  username: string = "";
  email: string = "";
  password: string = "";

  constructor(
    private router: Router,
    private sessionManager: SessionManager,
    private alert: AlertManager,
  ) { }

  async OnRegisterButtonPressed() {
    try {
      const userCredential = await this.sessionManager.registerUserWith(this.email, this.password, this.username);
      const user = userCredential.user;

      if (user) {
        this.alert.showAlert(
          'Registro exitoso',
          'Ya eres parte de nuestro sistema',
        );
      } else {
        alert('¡Registro exitoso!');
      }

      this.router.navigate(['/login']);
    } catch (error: any) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          this.alert.showAlert(
            'Error',
            'Este correo electrónico ya está en uso. Por favor, utiliza otro o inicia sesión.',
          );
          break;
        case 'auth/invalid-email':
          this.alert.showAlert(
            'Error',
            'La dirección de correo electrónico no es válida.',
          );
          break;
        case 'auth/weak-password':
          this.alert.showAlert(
            'Error',
            'La contraseña es muy débil.',
          );
          break;
        default:
          this.alert.showAlert(
            'Error',
            'Ocurrió un error al registrar el usuario: ' + error.message,
          );
          break;
      }
    }
  }

  resetForm() {
    this.username = "";
    this.password = "";
    this.email = "";
  }
}
