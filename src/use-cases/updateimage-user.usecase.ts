import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LocalStorage } from 'src/service/localstorage.service';
import { User } from 'src/interfaces/User';

@Injectable({
    providedIn: 'root'
})
export class UpdateUserImageUseCase {
    constructor(
        private afAuth: AngularFireAuth,
        private firestore: AngularFirestore,
        private localStorage: LocalStorage
    ) {}

    async getUserProfile(): Promise<User | null> {
        try {
            const activeUser = await this.localStorage.get('activeUser');
            return activeUser;
        } catch (error) {
            console.error('Error al obtener perfil:', error);
            return null;
        }
    }

    async updateUserPhoto(photoURL: string): Promise<boolean> {
      try {
        const user = await this.afAuth.currentUser;
        if (user) {
          await this.firestore.collection('users').doc(user.uid).update({ photoURL });
          const activeUser = await this.localStorage.get('activeUser');
          if (activeUser) {
            activeUser.photoURL = photoURL;
            await this.localStorage.set('activeUser', activeUser);
          }
          return true;
        }
        return false;
      } catch (error) {
        console.error('Error al actualizar foto:', error);
        return false;
      }
    }
}
