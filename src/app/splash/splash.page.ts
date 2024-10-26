import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageProvider } from 'src/managers/StorageProvider';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  name: string = '';

  constructor(private router: Router, private storageProvider: StorageProvider) { }

  ngOnInit() {
    this.loadData();
    setTimeout(() => {
      this.router.navigate(['/tabs/menu']);
    }, 3000);
  }

  async loadData() {
    const username = await this.storageProvider.get('username');
    console.log('Nombre de usuario recuperado:', username);
    this.name = username;
  }
}
