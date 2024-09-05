import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManager } from 'src/managers/SessionManager';
import { AlertManager } from 'src/managers/AlertManager';


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
  ) { }

  protected username: string = '';
  protected password: string = '';

  onLoginButtonClick() {
    if (this.sessionManager.login(this.username, this.password)) {
      let userData = this.sessionManager.getUserData();
      this.router.navigate(['/splash'], {queryParams: userData});
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
