import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicinasService } from 'src/service/medicinas.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirestoreService } from 'src/service/firestore.service';
import { ModalController } from '@ionic/angular';
import { AgregarHorarioComponent } from '../agregar-horario/agregar-horario.component';

@Component({
  selector: 'app-medicina-detalle',
  templateUrl: './medicina-detalle.page.html',
  styleUrls: ['./medicina-detalle.page.scss'],
})
export class MedicinaDetallePage implements OnInit {
  medicina: any;
  expandedSection: string | null = null;
  selectedTime: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private medicinasService: MedicinasService,
    private afAuth: AngularFireAuth,
    private firestoreService: FirestoreService,
    private modalController: ModalController
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

  async openAgregarHorarioModal() {
    const modal = await this.modalController.create({
      component: AgregarHorarioComponent,
      componentProps: { medicina: this.medicina }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        console.log('Horario agregado:', result.data);
      }
    });

    return await modal.present();
  }
}
