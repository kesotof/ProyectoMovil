import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManager } from 'src/managers/SessionManager';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor( private router: Router,private sessionManager: SessionManager ) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/tabs/menu']);
  }, 3000);
  }

  username: string = this.sessionManager.getUserData()?.username || 'Usuario';

}
