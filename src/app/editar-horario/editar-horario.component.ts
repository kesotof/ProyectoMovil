import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirestoreService } from 'src/service/firestore.service';

@Component({
  selector: 'app-editar-horario',
  templateUrl: './editar-horario.component.html',
  styleUrls: ['./editar-horario.component.scss'],
})
export class EditarHorarioComponent implements OnInit {
  @Input() horario: any;
  selectedTime: string | undefined;

  constructor(private modalController: ModalController, private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.selectedTime = this.horario.time;
  }

  close() {
    this.modalController.dismiss();
  }

  editarHorario() {
    const updatedHorario = {
      ...this.horario,
      time: this.selectedTime
    };
    this.firestoreService.updateHorario(this.horario.id, updatedHorario).then(() => {
      this.modalController.dismiss(updatedHorario);
    });
  }

  eliminar() {
    this.firestoreService.deleteHorario(this.horario.id).then(() => {
      this.modalController.dismiss();
    });
  }

}
