import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/interfaces/User';
import { Pastillero } from 'src/interfaces/Pastillero';
import { Medicamento } from 'src/interfaces/Medicamento';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) { }

  // CRUD de pastillero

  // Crear nuevo pastillero para un usuario
  createPastillero(userId: string) {
    const newPastillero: Pastillero = {
      pastilleroId: userId,
      medicamentos: []
    };
    return this.firestore.collection('pastillero').doc(userId).set(newPastillero);
  }

  // Obtener pastillero de un usuario
  getPastillero(userId: string) {
    return this.firestore.collection('pastillero').doc(userId).valueChanges();
  }

  // Agregar horario a un medicamento
  async addHorario(userId: string, medicamento: any, hora: string) {
    const pastilleroRef = this.firestore.collection('pastillero').doc(userId);
    const pastillero = await pastilleroRef.get().toPromise();

    if (!pastillero?.exists) {
      await this.createPastillero(userId);
    }

    return pastilleroRef.get().toPromise().then((doc) => {
      const data = doc?.data() as Pastillero;
      const medicamentoExistente = data.medicamentos.find(m => m.medicamentoId === medicamento.id);

      if (medicamentoExistente) {
        medicamentoExistente.horarios.push({
          id: this.firestore.createId(),
          hora: hora
        });
      } else {
        data.medicamentos.push({
          medicamentoId: medicamento.id,
          nombre: medicamento.nombre,
          horarios: [{
            id: this.firestore.createId(),
            hora: hora
          }]
        });
      }

      return pastilleroRef.update(data);
    });
  }

  // Actualizar horario
  updateHorario(userId: string, medicamentoId: string, horarioId: string, newHora: string) {
    return this.firestore.collection('pastillero').doc(userId).get().toPromise()
      .then((doc) => {
        const data = doc?.data() as Pastillero;
        const medicamento = data.medicamentos.find(m => m.medicamentoId === medicamentoId);
        const horario = medicamento?.horarios.find(h => h.id === horarioId);

        if (horario) {
          horario.hora = newHora;
          return this.firestore.collection('pastillero').doc(userId).update(data);
        }
        return Promise.reject('Horario no encontrado');
      });
  }

  // Eliminar horario
  deleteHorario(userId: string, medicamentoId: string, horarioId: string) {
    return this.firestore.collection('pastillero').doc(userId).get().toPromise()
      .then((doc) => {
        const data = doc?.data() as Pastillero;
        const medicamento = data.medicamentos.find(m => m.medicamentoId === medicamentoId);

        if (medicamento) {
          medicamento.horarios = medicamento.horarios.filter(h => h.id !== horarioId);
          if (medicamento.horarios.length === 0) {
            data.medicamentos = data.medicamentos.filter(m => m.medicamentoId !== medicamentoId);
          }
          return this.firestore.collection('pastillero').doc(userId).update(data);
        }
        return Promise.reject('Medicamento no encontrado');
      });
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
