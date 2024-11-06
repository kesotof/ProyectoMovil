import { Component, OnInit } from '@angular/core';
import { MedicinasService } from 'src/service/medicinas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medicinas',
  templateUrl: './medicinas.page.html',
  styleUrls: ['./medicinas.page.scss'],
})
export class MedicinasPage implements OnInit {
  medicinas: any[] = [];

  constructor(private medicinasService: MedicinasService, private router: Router) {}

  ngOnInit() {
    this.medicinasService.getMedicinas().subscribe(data => {
      this.medicinas = data;
    });
  }

  verDetalle(id: string) {
    if (id) {
      this.router.navigate(['/medicina-detalle', id]);
    } else {
      console.error('ID de medicina no definido');
    }
  }
}
