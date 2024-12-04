import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController, ActionSheetController } from '@ionic/angular';
import { ImageComService } from 'src/service/imageCom.service';
import { agregarComUseCase } from 'src/use-cases/agregarCom.use.case';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-agregarcom',
  templateUrl: './agregarcom.page.html',
  styleUrls: ['./agregarcom.page.scss'],
})
export class AgregarcomPage implements OnInit {
  sintomaId: string | undefined;
  sintomaNombre: string | undefined;
  comentarioForm: FormGroup;
  imageUrl: string | undefined;
  userName: string | undefined;
  userId: string | undefined;
  uploadProgress: number = 0;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastController: ToastController,
    private actionSheetController: ActionSheetController,
    private imageComService: ImageComService,
    private addCommentUseCase: agregarComUseCase,
    private storage: Storage
  ) {
    this.comentarioForm = this.fb.group({
      nombreMedicamento: ['', Validators.required],
      comentario: ['', Validators.required]
    });
  }

  async ngOnInit() {
    await this.storage.create();
    this.sintomaId = this.route.snapshot.paramMap.get('id')!;
    this.sintomaNombre = this.route.snapshot.paramMap.get('nombre')!;
    this.afAuth.user.subscribe(async user => {
      if (user) {
        this.userName = user.displayName ?? user.email ?? '';
        this.userId = user.uid;
        await this.storage.set('userName', this.userName);
      }
    });
  }

  async onSubmit() {
    if (this.comentarioForm.valid) {
      const comentarioData = this.comentarioForm.value;
      comentarioData.userName = await this.storage.get('userName');
      try {
        await this.addCommentUseCase.execute(this.sintomaNombre!, comentarioData, this.imageUrl, this.userId);
        this.presentToast('Comentario agregado exitosamente');
        this.comentarioForm.reset();
        this.imageUrl = undefined;
        this.uploadProgress = 0;
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

  async selectImageSource() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Selecciona una opción',
      buttons: [
        {
          text: 'Cámara',
          icon: 'camera',
          handler: async () => {
            const result = await this.imageComService.getImageFromCamera();
            if (result.success && result.imageUrl) {
              this.imageUrl = result.imageUrl;
              this.uploadImage(result.imageUrl);
            }
          }
        },
        {
          text: 'Galería',
          icon: 'image',
          handler: async () => {
            const result = await this.imageComService.getImageFromGallery();
            if (result.success && result.imageUrl) {
              this.imageUrl = result.imageUrl;
              this.uploadImage(result.imageUrl);
            }
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  async uploadImage(imageUrl: string) {
    const imagePath = `images/${this.sintomaNombre}/${new Date().getTime()}.png`;
    const uploadTask = this.imageComService.uploadImage(imagePath, imageUrl);

    uploadTask.percentageChanges().subscribe(progress => {
      this.uploadProgress = progress || 0;
    });

    try {
      await uploadTask;
      this.presentToast('Imagen subida exitosamente');
    } catch (error) {
      this.presentToast('Error al subir imagen');
      console.error('Error al subir imagen: ', error);
    }
  }
}
