import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManager } from '../../managers/SessionManager';
import { AlertManager } from '../../managers/AlertManager';
import { StorageProvider } from 'src/managers/StorageProvider';

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
    this.email = '';
    this.password = '';
  }

  async onLoginButtonClick() {
    try {
      const userCredential = await this.sessionManager.loginWithEmail(this.email, this.password);
      const user = userCredential.user;
      if (user) {
        const username = await this.storageProvider.get('username');
        await this.storageProvider.set('username', username);
        this.router.navigate(['/splash']);
      }
    } catch (error) {
      this.alertManager.showAlert('Error', 'No se pudo iniciar sesión, por favor verifica tus credenciales e intenta de nuevo.');
    }
  }

  onRegisterButtonClick() {
    this.router.navigate(['/registro']);
  }
}
