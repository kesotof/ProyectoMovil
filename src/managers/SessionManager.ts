import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getDatabase, ref, set } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class SessionManager {
  constructor(public fireAuth: AngularFireAuth) { }

  async signOut() {
    return await this.fireAuth.signOut();
  }

  async registerUserWith(email: string, password: string, username: string): Promise<any> {
    const userCredential = await this.fireAuth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    if (user) {
      const db = getDatabase();
      const dbRef = ref(db, 'users/' + user.uid);
      await set(dbRef, {
        username: username,
        email: email,
      });
    }
    return userCredential;
  }

  async loginWithUsername(username: string, password: string): Promise<any> {
    throw new Error('Método no implementado para Realtime Database');
  }

  async resetPassword(email: string) {
    return await this.fireAuth.sendPasswordResetEmail(email);
  }

  async getProfile() {
    return await this.fireAuth.currentUser;
  }
}
