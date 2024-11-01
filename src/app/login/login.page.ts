import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManager } from '../../managers/SessionManager';
import { AlertManager } from '../../managers/AlertManager';
import { StorageProvider } from 'src/managers/StorageProvider';
import { getDatabase, ref, get } from 'firebase/database';

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

  resetFields() {
    this.email = '';
    this.password = '';
  }

  async onLoginButtonClick() {
    try {
      const userCredential = await this.sessionManager.loginWithEmail(this.email, this.password);
      const user = userCredential.user;
      if (user) {
        const db = getDatabase();
        const userRef = ref(db, `users/${user.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          const username = userData.username;
          await this.storageProvider.set('currentUsername', username);
          await this.storageProvider.set('session', true);
          this.router.navigate(['/splash']);
        } else {
          this.alertManager.showAlert('Error', 'No se encontró información del usuario');
        }
      }
    } catch (error) {
      this.alertManager.showAlert('Error', 'No se pudo iniciar sesión, intenta de nuevo.');
    }
  }

  onRegisterButtonClick() {
    this.router.navigate(['/registro']);
  }
}
