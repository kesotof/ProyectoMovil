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
}
