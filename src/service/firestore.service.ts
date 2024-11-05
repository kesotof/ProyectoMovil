import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  addHorario(horario: any) {
    return this.firestore.collection('pastillero').add(horario);
  }

  getHorarios() {
    return this.firestore.collection('pastillero').snapshotChanges();
  }

  updateHorario(id: string, horario: any) {
    return this.firestore.collection('pastillero').doc(id).update(horario);
  }

  deleteHorario(id: string) {
    return this.firestore.collection('pastillero').doc(id).delete();
  }

}
