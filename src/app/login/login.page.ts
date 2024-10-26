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

  constructor(
    private router : Router,
    private sessionManager : SessionManager,
    private alertManager : AlertManager,
    private storageProvider : StorageProvider
  ) { }

  protected username: string = '';
  protected password: string = '';

  onLoginButtonClick() {
    if (this.sessionManager.login(this.username, this.password)) {
        let userData = this.sessionManager.getUserData();
        this.storageProvider.set('userData', userData);
        this.storageProvider.set('username', this.username);
        console.log('Nombre de usuario almacenado:', this.username);
        this.router.navigate(['/splash'], { queryParams: userData });
    } else {
        this.alertManager.showAlert('Error', 'Usuario o contraseña incorrectos');
    }
}
  onRegisterButtonClick() {
    this.router.navigate(['/registro']);
  }

  openAlert(title: string, message: string) {
    alert(title + ': ' + message);
  }

  ngOnInit() {
  }
}
