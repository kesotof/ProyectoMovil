import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirestoreService } from 'src/service/firestore.service';

@Component({
  selector: 'app-agregar-horario',
  templateUrl: './agregar-horario.component.html',
  styleUrls: ['./agregar-horario.component.scss'],
})
export class AgregarHorarioComponent {
  @Input() medicina: any;
  selectedTime: string | undefined;

  constructor(private modalController: ModalController, private firestoreService: FirestoreService) {}

  close() {
    this.modalController.dismiss();
  }

  agregarHorario() {
    const horario = {
      medicamentoId: this.medicina.id,
      nombre: this.medicina.nombre,
      time: this.selectedTime,
      tipo: this.medicina.tipo
    };
    this.firestoreService.addHorario(horario).then(() => {
      this.modalController.dismiss(horario);
    });
  }
}
