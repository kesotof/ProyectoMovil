import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManager } from 'src/service/session.controller';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage {
  constructor(private router: Router, private sessionManager: SessionManager) { }

  async onLogout() {
    // remove the user from the session
    await this.sessionManager.logout();
    // and navigate to login page
    this.router.navigate(['/splash']);
  }

}
