import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicinasService {
  constructor(private firestore: AngularFirestore) {}

  getMedicinas(): Observable<any[]> {
    return this.firestore.collection('medicinas').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getMedicinaById(id: string): Observable<any> {
    return this.firestore.collection('medicinas').doc(id).valueChanges();
  }
}
