import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LocalStorage } from './localstorage.service';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/interfaces/User';
import { Pastillero } from 'src/interfaces/Pastillero';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private readonly PASTILLERO_KEY = 'pastillero';

  constructor(
    private firestore: AngularFirestore,
    private localStorage: LocalStorage
  ) {}

  // CRUD de pastillero

  //Crear pastillero
  async createPastillero(userId: string) {
    const newPastillero: Pastillero = {
      pastilleroId: userId,
      medicamentos: []
    };
    await this.firestore.collection('pastillero').doc(userId).set(newPastillero);
    await this.localStorage.set(this.PASTILLERO_KEY, newPastillero);
    return newPastillero;
  }

  //Obtener pastillero
  async getPastillero(userId: string) {
    const localPastillero = await this.localStorage.get(this.PASTILLERO_KEY);
    if (localPastillero) {
      return localPastillero;
    }
    const pastilleroDoc = await this.firestore.collection('pastillero').doc(userId).get().toPromise();
    const pastillero = pastilleroDoc?.data() as Pastillero;
    if (pastillero) {
      await this.localStorage.set(this.PASTILLERO_KEY, pastillero);
    }
    return pastillero;
  }

  //agregar un horario al medicamento
  async addHorario(userId: string, medicamento: any, hora: string) {
    const pastilleroRef = this.firestore.collection('pastillero').doc(userId);
    const pastillero = await pastilleroRef.get().toPromise();
    if (!pastillero?.exists) {
      await this.createPastillero(userId);
    }
    const data = (await this.getPastillero(userId)) as Pastillero;
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
    await pastilleroRef.update(data);
    await this.localStorage.set(this.PASTILLERO_KEY, data);
    return data;
  }

  //Actualizar el horario de un medicamento
  async updateHorario(userId: string, medicamentoId: string, horarioId: string, newHora: string) {
    const doc = await this.firestore.collection('pastillero').doc(userId).get().toPromise();
    const data = doc?.data() as Pastillero;
    const medicamento = data.medicamentos.find(m => m.medicamentoId === medicamentoId);
    const horario = medicamento?.horarios.find(h => h.id === horarioId);
    if (horario) {
      horario.hora = newHora;
      await this.firestore.collection('pastillero').doc(userId).update(data);
      await this.localStorage.set(this.PASTILLERO_KEY, data);
      return data;
    }
    throw new Error('Horario no encontrado');
  }

  //Eliminar un horario
  async deleteHorario(userId: string, medicamentoId: string, horarioId: string) {
    const doc = await this.firestore.collection('pastillero').doc(userId).get().toPromise();
    const data = doc?.data() as Pastillero;
    const medicamento = data.medicamentos.find(m => m.medicamentoId === medicamentoId);

    if (medicamento) {
      medicamento.horarios = medicamento.horarios.filter(h => h.id !== horarioId);
      if (medicamento.horarios.length === 0) {
        data.medicamentos = data.medicamentos.filter(m => m.medicamentoId !== medicamentoId);
      }
      await this.firestore.collection('pastillero').doc(userId).update(data);
      await this.localStorage.set(this.PASTILLERO_KEY, data);
      return data;
    }
    throw new Error('Medicamento no encontrado');
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
}
