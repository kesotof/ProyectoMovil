import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicinasService {
  constructor(private firestore: AngularFirestore) {}

  //Obtiene todos los medicamentos
  getMedicinas(): Observable<any[]> {
    return this.firestore.collection('medicinas').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        const tipoImagen = this.getImagenPorTipo(data.tipo);
        return { id, ...data, tipoImagen };
      }))
    );
  }

  //Busca al medicamento por su id
  getMedicinaById(id: string): Observable<any> {
    return this.firestore.collection('medicinas').doc(id).snapshotChanges().pipe(
      map(a => {
        const data = a.payload.data() as any;
        const tipoImagen = this.getImagenPorTipo(data.tipo);
        return { id, ...data, tipoImagen };
      })
    );
  }


  //Llama a la imagen dependiendo del tipo de medicamento
  private getImagenPorTipo(tipo: string): string {
    switch (tipo) {
      case 'pastilla':
        return 'assets/icon/pastilla.png';
      case 'jarabe':
        return 'assets/icon/jarabe.png';
      default:
        return 'assets/images/default.png';
    }
  }
}
