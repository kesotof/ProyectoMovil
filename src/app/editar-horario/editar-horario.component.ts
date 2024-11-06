import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirestoreService } from 'src/service/firestore.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-editar-horario',
  templateUrl: './editar-horario.component.html',
  styleUrls: ['./editar-horario.component.scss'],
})
export class EditarHorarioComponent implements OnInit {
  @Input() horario: any;
  @Input() medicamentoId: string | undefined;
  selectedTime: string | undefined;
  userId: string | undefined;

  constructor(
    private modalController: ModalController,
    private firestoreService: FirestoreService,
    private auth: AngularFireAuth
  ) {
    this.auth.user.subscribe(user => {
      this.userId = user?.uid || '';
    });
  }

  ngOnInit() {
    this.selectedTime = this.horario.hora;
  }

  close() {
    this.modalController.dismiss();
  }

  editarHorario() {
    if (!this.userId || !this.selectedTime || !this.medicamentoId) return;
    this.firestoreService.updateHorario(
      this.userId,
      this.medicamentoId,
      this.horario.id,
      this.selectedTime
    ).then(() => {
      this.modalController.dismiss({
        success: true,
        action: 'update',
        horario: {
          id: this.horario.id,
          hora: this.selectedTime
        }
      });
    }).catch(error => {
      console.error('Error al actualizar horario:', error);
    });
  }

  eliminar() {
    if (!this.userId || !this.medicamentoId) return;

    this.firestoreService.deleteHorario(
      this.userId,
      this.medicamentoId,
      this.horario.id
    ).then(() => {
      this.modalController.dismiss({
        success: true,
        action: 'delete'
      });
    }).catch(error => {
      console.error('Error al eliminar horario:', error);
    });
  }
}
