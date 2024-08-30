import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor( private router:Router) {}
  navigate(){
  this.router.navigate(['/cuenta'])
  }

  ngOnInit() {
  }

  contador: number = 0;
  vasos: number[] = [];

  crearVaso() {
    if (this.contador < 5) {
      this.contador += 1;
      this.vasos.push(this.contador);
    }
  }

}
