// src/app/pages/calendar/calendar.page.ts
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/service/firestore.service';
import { ModalController } from '@ionic/angular';
import { EditarHorarioComponent } from '../../editar-horario/editar-horario.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Pastillero } from 'src/interfaces/Pastillero';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  horarios: any[] = [];
  groupedHorarios: { [key: string]: any[] } = {};
  userId: string | undefined;

  constructor(
    private firestoreService: FirestoreService,
    private modalController: ModalController,
    private auth: AngularFireAuth
  ) {
    this.auth.user.subscribe(user => {
      this.userId = user?.uid;
      if (this.userId) {
        this.loadHorarios();
      }
    });
  }

  ngOnInit() {}

  loadHorarios() {
    if (!this.userId) return;

    this.firestoreService.getPastillero(this.userId).subscribe((data: any) => {
      if (data) {
        const pastillero = data as Pastillero;
        this.horarios = [];

        pastillero.medicamentos.forEach(medicamento => {
          medicamento.horarios.forEach(horario => {
            this.horarios.push({
              id: horario.id,
              hora: horario.hora,
              nombre: medicamento.nombre,
              medicamentoId: medicamento.medicamentoId
            });
          });
        });

        this.groupHorariosByTime();
      }
    });
  }

  groupHorariosByTime() {
    this.groupedHorarios = {};
    this.horarios.sort((a, b) => a.hora.localeCompare(b.hora));

    this.horarios.forEach(horario => {
      if (!this.groupedHorarios[horario.hora]) {
        this.groupedHorarios[horario.hora] = [];
      }
      this.groupedHorarios[horario.hora].push(horario);
    });
  }

  async openEditarHorarioModal(horario: any) {
    const modal = await this.modalController.create({
      component: EditarHorarioComponent,
      componentProps: {
        horario: horario,
        medicamentoId: horario.medicamentoId
      }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data?.success) {
        this.loadHorarios();
      }
    });

    return await modal.present();
  }
}
