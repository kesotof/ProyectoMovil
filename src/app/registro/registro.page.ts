import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertManager } from '../../managers/AlertManager';
import { RegisterUserUseCase } from 'src/use-cases/register-user.usecase';

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
    private alert: AlertManager,
    private registerUserUseCase: RegisterUserUseCase,

  ) { }

  async OnRegisterButtonPressed() {
    // first check if the input is valid
    if (!isValidInput(this.username, this.email, this.password)) {
      this.alert.showAlert(
        'Error',
        'Por favor, llena todos los campos',
      );
      return;
    }

    // then we try to register the user
    try {
      const registerResult = await this.registerUserUseCase.register(this.username, this.email, this.password);

      if (registerResult) {
        this.alert.showAlert(
          'Registro exitoso',
          'Ya eres parte de nuestro sistema :)',
        );
        this.resetForm();
        this.router.navigate(['/login']);
      } else {
        alert('Algo Falló!');
      }
    } catch (error) {
      this.alert.showAlert(
        'Error',
        'Error al registrar: ' + error,
      );
    }
  }

  resetForm() {
    this.username = "";
    this.password = "";
    this.email = "";
  }

}

// !!! not complete. We need to implement validation per field and 
// show dynamic css classes to show errors on screen
function isValidInput(name: string, email: string, password: string) {
  // Check if the input is not empty
  if (name === "" || email === "" || password === "") {
    return false;
  }
  else {
    return true;
  }
}

