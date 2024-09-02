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
  cantidad: string = '';

  crearVaso() {
  if (this.contador < 1000) {
      this.contador += 200;
      this.vasos.push(200);
      this.cantidad = this.contador === 1000 ? '1 Ltr' : `${this.contador} ml`;
    }
   }

  alertButtons = ['Cerrar'];
}
