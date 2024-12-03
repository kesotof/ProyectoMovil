import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LocalStorage } from 'src/service/localstorage.service';


@Injectable({
  providedIn: 'root'
})
export class UpdateUserNameUseCase {
  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore,private localStorage: LocalStorage) {}


  async updateUserName(newUserName: string): Promise<boolean> {
    try {
        const user = await this.afAuth.currentUser;
        if (user) {
            //Actualiza el nombre en firebase y en el localStorage
            await this.firestore.collection('users').doc(user.uid).update({ name: newUserName });
            const activeUser = await this.localStorage.get('activeUser');
            if (activeUser) {
                activeUser.name = newUserName;
                await this.localStorage.set('activeUser', activeUser);
            }
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error al actualizar el nombre de usuario:', error);
        return false;
    }
  }

  async getUserName(): Promise<string | null> {
    const activeUser = await this.localStorage.get('activeUser');
    return activeUser ? activeUser.name : null;
  }

}
