import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirestoreService } from 'src/service/firestore.service';
import { ModalController } from '@ionic/angular';
import { EditarHorarioComponent } from '../../editar-horario/editar-horario.component';
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
  private readonly STORAGE_KEY = 'horarios';

  constructor(
    private auth: AngularFireAuth,
    private firestoreService: FirestoreService,
    private modalController: ModalController
  ) {
    this.loadHorarios();
  }
  ngOnInit() {
    this.auth.user.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.loadHorarios();
      }
    });
  }

  async loadHorarios() {
    const cachedData = localStorage.getItem(this.STORAGE_KEY);
    if (cachedData) {
      try {
        this.horarios = JSON.parse(cachedData);
        this.groupHorariosByTime();
      } catch {
        localStorage.removeItem(this.STORAGE_KEY);
      }
    }
    if (!this.userId) return;
    try {
      const data = await this.firestoreService.getPastillero(this.userId);
      if (data) {
        const pastillero = data as Pastillero;
        this.horarios = pastillero.medicamentos.reduce((acc: any[], med) => {
          const horarios = med.horarios.map(h => ({
            id: h.id,
            hora: h.hora,
            nombre: med.nombre,
            medicamentoId: med.medicamentoId
          }));
          return [...acc, ...horarios];
        }, []);

        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.horarios));
        this.groupHorariosByTime();
      }
    } catch (error) {
      console.error('Error al cargar horarios:', error);
    }
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

  ionViewWillEnter() {
    if (this.userId) {
      this.loadHorarios();
    }
  }
}
