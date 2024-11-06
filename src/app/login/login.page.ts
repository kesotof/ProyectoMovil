import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertManager } from '../../managers/AlertManager';
import { LoginUserUseCase } from 'src/use-cases/login-user.usecase';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private alertManager: AlertManager,
    private loginUserUseCase: LoginUserUseCase
  ) { }

  ngOnInit() {
    this.resetFields();
  }

  resetFields() {
    this.email = '';
    this.password = '';
  }

  async onLoginButtonClick() {
    // login use case
    try {
      let result = await this.loginUserUseCase.login(this.email, this.password);
      if (result) {
        console.log('Login successful');
        this.router.navigate(['/splash']);
      }
      else {
        console.log('Login failed');
        this.alertManager.showAlert('Error', 'Error al iniciar sesión');
      }
    } catch (error) {
      console.log(error);
    }
  }

  onRegisterButtonClick() {
    this.router.navigate(['/registro']);
  }
}
