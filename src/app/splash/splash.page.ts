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
    // Initial setup if needed
  }

  async ViewWillEnter() {
    await this.checkUser();
  }

  async checkUser() {
    await this.loadUser();
    if (this.user) {
      this.router.navigate(['/tabs/menu']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  async loadUser() {
    this.user = await this.sessionManager.getActiveUser();
    console.log('User:', this.user); // !!!
  }
}
