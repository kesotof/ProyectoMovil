import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable, firstValueFrom } from 'rxjs';
import { User } from 'src/interfaces/User';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) { }

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

  // User methods
  public async addUser(user: any) {
    let path = 'users/' + user.uid;
    return await this.firestore.doc(path).set(user);
  }

  public async getUser(id: any): Promise<User> {
    const userDoc = this.firestore.collection('users').doc(id).snapshotChanges().pipe(
      map(action => {
        const data = action.payload.data() as User;
        return { id: action.payload.id, ...data };
      })
    );
    return await firstValueFrom(userDoc);
  }

  // Pastillero methods


}
