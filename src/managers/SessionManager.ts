import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class SessionManager {
  constructor(public fireAuth: AngularFireAuth, private firestore: AngularFirestore) { }

  async signOut() {
    return await this.fireAuth.signOut();
  }

  async registerUserWith(email: string, password: string, username: string): Promise<any> {
    const userCredential = await this.fireAuth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    if (user) {
      await this.firestore.collection('users').doc(user.uid).set({
        username: username,
        email: email,
      });
    }
    return userCredential;
  }

  async loginWithUsername(username: string, password: string): Promise<any> {
    const userDoc = await this.firestore.collection('users', ref => ref.where('username', '==', username)).get().toPromise();
    if (userDoc && !userDoc.empty) {
      const userEmail = (userDoc.docs[0].data() as { email: string }).email;
      return this.fireAuth.signInWithEmailAndPassword(userEmail, password);
    } else {
      throw new Error('Usuario no encontrado');
    }
  }

  async resetPassword(email: string) {
    return await this.fireAuth.sendPasswordResetEmail(email);
  }

  async getProfile() {
    return await this.fireAuth.currentUser;
  }
}
