import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManager } from 'src/managers/SessionManager';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router : Router,
    private sessionManager : SessionManager
  ) { }

  protected username: string = '';
  protected password: string = '';

  onLoginButtonClick() {
    if (this.sessionManager.login(this.username, this.password)) {
      this.router.navigate(['/tabs/menu']);
    } else {
      this.openAlert('Login failed', 'Invalid username or password');
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
