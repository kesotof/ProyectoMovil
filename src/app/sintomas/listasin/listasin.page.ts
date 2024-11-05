import { Component, OnInit } from '@angular/core';
import { SintomasService } from 'src/service/sintomas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listasin',
  templateUrl: './listasin.page.html',
  styleUrls: ['./listasin.page.scss'],
})
export class ListasinPage implements OnInit {
  sintomas: any[] = [];

  constructor( private sintomasService : SintomasService, private router : Router ) { }

  ngOnInit() {
    this.sintomasService.getSintomas().subscribe(data => {
      this.sintomas = data;
    });
  }

  verDetalle(id: string) {
    if (id) {
      this.router.navigate(['sintomas/sintoma-detalle', id]);
    } else {
      console.error('ID de sintoma no definido');
    }
  }
}
