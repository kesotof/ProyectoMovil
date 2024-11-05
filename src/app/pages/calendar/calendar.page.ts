import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirestoreService } from 'src/service/firestore.service';
import { EditarHorarioComponent } from 'src/app/editar-horario/editar-horario.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  horarios: any[] = [];
  groupedHorarios: { [key: string]: any[] } = {};

  constructor(private firestoreService: FirestoreService, private modalController: ModalController) {}

  ngOnInit() {
    this.loadHorarios();
  }

  loadHorarios() {
    this.firestoreService.getHorarios().subscribe(data => {
      this.horarios = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as any
        };
      });
      this.groupHorariosByTime();
    });
  }

  groupHorariosByTime() {
    this.groupedHorarios = this.horarios.reduce((groups, horario) => {
      if (horario.time) {
        const time = horario.time.split('T')[1].split(':').slice(0, 2).join(':');
        if (!groups[time]) {
          groups[time] = [];
        }
        groups[time].push(horario);
      }
      return groups;
    }, {});
  }

  async openEditarHorarioModal(horario: any) {
    const modal = await this.modalController.create({
      component: EditarHorarioComponent,
      componentProps: { horario: horario }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        console.log('Horario editado:', result.data);
      }
    });

    return await modal.present();
  }
}
