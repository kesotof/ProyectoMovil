import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { PopoverController } from '@ionic/angular';
import { ImageSelectorComponent } from './image-selector.component';
import { FirebaseStorageService } from 'src/service/firebase-storage.service';
import { RegisterUserUseCase } from 'src/use-cases/register-user.usecase';
import { AlertManager } from 'src/managers/AlertManager';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  username: string = '';
  email: string = '';
  password: string = '';
  selectedImage: string = '';

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private alert: AlertManager,
    private registerUserUseCase: RegisterUserUseCase,
    private popoverController: PopoverController,
    private storageService: FirebaseStorageService
  ) {
    this.loadDefaultImage();
  }

  async loadDefaultImage() {
    try {
      const defaultImage = await this.storageService.getDefaultProfileImage();
      this.selectedImage = defaultImage;
    } catch (error) {
      console.error('Error al cargar imagen por defecto:', error);
      this.selectedImage = 'assets/images/user-default.png';
    }
  }

  async openImageSelection(ev: Event) {
    const popover = await this.popoverController.create({
      component: ImageSelectorComponent,
      event: ev,
      componentProps: { currentImage: this.selectedImage },
      cssClass: 'image-selection-popover'
    });

    await popover.present();

    const { data } = await popover.onDidDismiss();
    if (data?.image) {
      this.selectedImage = data.image;
    }
  }

  async OnRegisterButtonPressed() {
    // first check if the input is valid
    if (!isValidInput(this.username, this.email, this.password)) {
      this.alert.showAlert(
        'Error',
        'Por favor, llena todos los campos',
      );
      return;
    }

    // then we try to register the user
    try {
      const registerResult = await this.registerUserUseCase.register(this.username, this.email, this.password, this.selectedImage);

      if (registerResult) {
        this.alert.showAlert(
          'Registro exitoso',
          'Ya eres parte de nuestro sistema :)',
        );
        this.resetForm();
        this.router.navigate(['/login']);
      } else {
        alert('Algo Falló!');
      }
    } catch (error) {
      this.alert.showAlert(
        'Error',
        'Error al registrar: ' + error,
      );
    }
  }

  resetForm() {
    this.username = "";
    this.password = "";
    this.email = "";
    this.loadDefaultImage();
  }

}

// !!! not complete. We need to implement validation per field and
// show dynamic css classes to show errors on screen
function isValidInput(name: string, email: string, password: string) {
  // Check if the input is not empty
  if (name === "" || email === "" || password === "") {
    return false;
  }
  else {
    return true;
  }
}
