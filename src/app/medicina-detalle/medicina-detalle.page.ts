import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MedicinasService } from 'src/service/medicinas.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-medicina-detalle',
  templateUrl: './medicina-detalle.page.html',
  styleUrls: ['./medicina-detalle.page.scss'],
})
export class MedicinaDetallePage implements OnInit {
  medicina: any;

  constructor(private route: ActivatedRoute, private medicinasService: MedicinasService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.medicinasService.getMedicinaById(id).subscribe(data => {
        this.medicina = data;
      });
    } else {
      console.error('No se pudo obtener el ID de la ruta');
    }
  }
}
