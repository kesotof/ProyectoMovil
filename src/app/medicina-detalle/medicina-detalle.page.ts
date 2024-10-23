import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicinasService } from 'src/service/medicinas.service';

@Component({
  selector: 'app-medicina-detalle',
  templateUrl: './medicina-detalle.page.html',
  styleUrls: ['./medicina-detalle.page.scss'],
})
export class MedicinaDetallePage implements OnInit {
  medicina: any;
  expandedSection: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private medicinasService: MedicinasService
  ) {}

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

  toggleSection(section: string) {
    this.expandedSection = this.expandedSection === section ? null : section;
  }
}
