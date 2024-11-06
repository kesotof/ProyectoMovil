import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirestoreService } from 'src/service/firestore.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-agregar-horario',
  templateUrl: './agregar-horario.component.html',
  styleUrls: ['./agregar-horario.component.scss'],
})
export class AgregarHorarioComponent {
  @Input() medicina: any;
  selectedTime: string | undefined;
  userId: any;

  constructor(
    private modalController: ModalController,
    private firestoreService: FirestoreService,
    private auth: AngularFireAuth
  ) {
    this.auth.user.subscribe(user => {
      this.userId = user?.uid;
    });
  }

  close() {
    this.modalController.dismiss();
  }

  async agregarHorario() {
    if (!this.selectedTime || !this.userId) return;

    try {
      await this.firestoreService.addHorario(this.userId, this.medicina, this.selectedTime);
      this.modalController.dismiss({ success: true });
    } catch (error) {
      console.error('Error al agregar horario:', error);
    }
  }
}
