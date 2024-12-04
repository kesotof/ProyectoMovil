import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.page.html',
  styleUrls: ['./comentario.page.scss'],
})
export class ComentarioPage implements OnInit {
  sintomaId: string | undefined;
  sintomaNombre: string | undefined;
  comentarios$: Observable<any[]> = new Observable();

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore) {}

  ngOnInit() {
    this.sintomaId = this.route.snapshot.paramMap.get('id')!;
    this.sintomaNombre = this.route.snapshot.paramMap.get('nombre')!;
    this.comentarios$ = this.firestore
      .collection('comentarios')
      .doc(this.sintomaNombre)
      .collection('comentarios')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }
}
