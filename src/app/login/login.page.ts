import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManager } from 'src/managers/SessionManager';
import { AlertManager } from 'src/managers/AlertManager';
import { StorageProvider } from 'src/managers/StorageProvider';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private sessionManager: SessionManager,
    private alertManager: AlertManager,
    private storageProvider: StorageProvider
  ) { }

  ngOnInit() {
    this.resetFields();
  }

  ionViewWillEnter() {
    this.resetFields();
  }

  resetFields() {
    this.username = '';
    this.password = '';
  }

  async onLoginButtonClick() {
    try {
      const userCredential = await this.sessionManager.loginWithUsername(this.username, this.password);
      const user = userCredential.user;
      if (user) {
        console.log('Usuario autenticado:', user);
        await this.storageProvider.set('username', this.username);
        this.router.navigate(['/splash']);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      this.alertManager.showAlert('Error', 'Error al iniciar sesión. Por favor, inténtelo de nuevo.');
    }
  }

  onRegisterButtonClick() {
    this.router.navigate(['/registro']);
  }

  openAlert(title: string, message: string) {
    this.alertManager.showAlert(title, message);
  }
}
