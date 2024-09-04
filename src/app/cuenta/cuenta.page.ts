import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})

export class CuentaPage  {

  constructor(private router: Router) {}

  onLogout() {
    this.router.navigate(['/login']);
  }

}
