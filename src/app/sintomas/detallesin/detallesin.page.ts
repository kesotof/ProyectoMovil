import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SintomasService } from 'src/service/sintomas.service';

@Component({
  selector: 'app-detallesin',
  templateUrl: './detallesin.page.html',
  styleUrls: ['./detallesin.page.scss'],
})
export class DetallesinPage implements OnInit {
  sintoma: any;

  constructor(private route: ActivatedRoute, private sintomasService: SintomasService, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.sintomasService.getSintomaById(id).subscribe(data => {
        this.sintoma = data;
      });
    } else {
      console.error('No se pudo obtener el ID de la ruta');
    }
  }

  verMedicamento(medicamentoId: string) {
    this.router.navigate(['/medicina-detalle', medicamentoId]);
  }
}
