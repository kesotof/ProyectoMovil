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

  getHorariosByUser(userId: string) {
    return this.firestore.collection('pastillero', ref => ref.where('userId', '==', userId)).snapshotChanges();
  }
}
