import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class SintomasService {
    constructor(private firestore: AngularFirestore) {}

    //Obtiene todos los sintomas
    getSintomas(): Observable<any[]> {
        return this.firestore.collection('sintomas').snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as any;
                const id = a.payload.doc.id;
                return { id, ...data };
            }))
        );
    }

    //Busca al sintoma por su id
    getSintomaById(id: string): Observable<any> {
        return this.firestore.collection('sintomas').doc(id).snapshotChanges().pipe(
            map(a => {
                const data = a.payload.data() as any;
                return { id, ...data };
            })
        );
    }
}
