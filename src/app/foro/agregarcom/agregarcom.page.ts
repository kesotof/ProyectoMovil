import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-agregarcom',
  templateUrl: './agregarcom.page.html',
  styleUrls: ['./agregarcom.page.scss'],
})
export class AgregarcomPage implements OnInit {
  sintomaId: string | undefined;
  sintomaNombre: string | undefined;
  comentarioForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private firestore: AngularFirestore,
    private toastController: ToastController
  ) {
    this.comentarioForm = this.fb.group({
      nombreMedicamento: ['', Validators.required],
      comentario: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.sintomaId = this.route.snapshot.paramMap.get('id')!;
    this.sintomaNombre = this.route.snapshot.paramMap.get('nombre')!;
  }

  async onSubmit() {
    if (this.comentarioForm.valid) {
      const comentarioData = this.comentarioForm.value;
      try {
        await this.firestore
          .collection('comentarios')
          .doc(this.sintomaNombre)
          .collection('comentarios')
          .add(comentarioData);
        this.presentToast('Comentario agregado exitosamente');
        this.comentarioForm.reset();
      } catch (error) {
        this.presentToast('Error al agregar comentario');
        console.error('Error al agregar comentario: ', error);
      }
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
