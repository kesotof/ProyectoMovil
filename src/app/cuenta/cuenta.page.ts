import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})

export class CuentaPage  {

  constructor(private router: Router) {}

  onLogout() {
    localStorage.removeItem('ingresado');
    this.router.navigate(['/login']);
  }
  onItemClick() {
    console.log('Item clicked');
  }
}
