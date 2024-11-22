import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { ImageService } from 'src/service/image.service';
import { FirebaseStorageService } from 'src/service/firebase-storage.service';
import { UpdateUserImageUseCase } from 'src/use-cases/updateimage-user.usecase';
import { UpdateUserNameUseCase } from 'src/use-cases/updateName-user.usecase';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  currentImage: string = '';
  userName: string = '';
  userId: string = '';
  currentUserName: string = '';
  newUserName: string = '';


  constructor(
    private actionSheetController: ActionSheetController,
    private imageService: ImageService,
    private storageService: FirebaseStorageService,
    private UpdateUserImageUseCase: UpdateUserImageUseCase,
    private updateUserNameUC: UpdateUserNameUseCase,
  ) {}

  async ngOnInit() {
    await this.loadUserProfile();
    await this.loadUserName();
  }

  async loadUserName() {
    this.currentUserName = (await this.updateUserNameUC.getUserName()) ?? '';
    this.newUserName = this.currentUserName || '';
  }

  async updateUserName() {
    try {
      const result = await this.updateUserNameUC.updateUserName(this.newUserName);
      if (result) {
        console.log('Nombre de usuario actualizado correctamente');
      } else {
        console.error('Error al actualizar el nombre de usuario');
      }
    } catch (error) {
      console.error('Error al actualizar el nombre de usuario:', error);
    }
  }

  async loadUserProfile() {
    const user = await this.UpdateUserImageUseCase.getUserProfile();
    if (user) {
      this.currentImage = user.photoURL;
      this.userName = user.name;
      this.userId = user.uid || '';
    }
  }

  async onProfileImagePressed() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Selecciona una opción',
      buttons: [
        {
          text: 'Cámara',
          icon: 'camera',
          handler: async () => {
            const result = await this.imageService.getImageFromCamera();
            if (result.success && result.imageUrl) {
              await this.updateProfilePhoto(result.imageUrl);
            }
          }
        },
        {
          text: 'Galería',
          icon: 'image',
          handler: async () => {
            const result = await this.imageService.getImageFromGallery();
            if (result.success && result.imageUrl) {
              await this.updateProfilePhoto(result.imageUrl);
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

  private async updateProfilePhoto(imageUrl: string) {
    try {
      if (this.currentImage && this.currentImage.includes('firebase')) {
        try {
          const oldImagePath = this.currentImage.split('user-image%2F')[1].split('?')[0];
          await this.storageService.deleteImage('user-image/' + oldImagePath);
        } catch (deleteError) {
          console.warn('No se pudo eliminar la imagen anterior:', deleteError);
        }
      }
      const uploadPath = `user-image/${this.userId}-${new Date().getTime()}.png`;
      const uploadedUrl = await this.storageService.uploadImage(uploadPath, imageUrl);

      if (await this.UpdateUserImageUseCase.updateUserPhoto(uploadedUrl)) {
        this.currentImage = uploadedUrl;
      } else {
        throw new Error('Error al actualizar la foto de perfil');
      }
    } catch (error) {
      console.error('Error en el proceso de actualización:', error);
    }
  }
}
