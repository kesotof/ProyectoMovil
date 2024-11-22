import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { ImageService } from 'src/service/image.service';
import { FirebaseStorageService } from 'src/service/firebase-storage.service';
import { UpdateUserImageUseCase } from 'src/use-cases/updateimage-user.usecase';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  currentImage: string = '';
  userName: string = '';
  userId: string = '';

  constructor(
    private actionSheetController: ActionSheetController,
    private imageService: ImageService,
    private storageService: FirebaseStorageService,
    private UpdateUserImageUseCase: UpdateUserImageUseCase,
  ) {}

  async ngOnInit() {
    await this.loadUserProfile();
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
