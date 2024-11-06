import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManager } from 'src/service/session.controller';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit, ViewWillEnter {
  ionViewWillEnter(): void {
    this.ViewWillEnter();
  }
  user: any = null;
  username: string = '';

  constructor(
    private router: Router,
    private sessionManager: SessionManager) { }

  ngOnInit() {

  }

  async ViewWillEnter() {
    const user = await this.sessionManager.getActiveUser();
    if (user) {
      this.username = user.name;
      setTimeout(() => {
        this.router.navigate(['/tabs/menu']);
      }, 2000);
    } else {
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    }
  }

  async loadUser() {
    this.user = await this.sessionManager.getActiveUser();
    console.log('User:', this.user);
  }
}
