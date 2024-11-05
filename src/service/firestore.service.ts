import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  // CRUD de pastillero

  // Crea un nuevo horario
  addHorario(horario: any) {
    return this.firestore.collection('pastillero').add(horario);
  }

  // Obtiene los horarios
  getHorarios() {
    return this.firestore.collection('pastillero').snapshotChanges();
  }

  // Actualiza un horario
  updateHorario(id: string, horario: any) {
    return this.firestore.collection('pastillero').doc(id).update(horario);
  }

  // Elimina un horario
  deleteHorario(id: string) {
    return this.firestore.collection('pastillero').doc(id).delete();
  }

}
