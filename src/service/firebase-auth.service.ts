import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})
export class FirebaseAuthService {

    constructor(private afAuth: Auth) { }

    // Register a new user
    public async register(email: string, password: string): Promise<UserCredential> {
        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            return userCredential;
        } catch (error) {
            throw error;
        }
    }

    // Login an existing user
    public async login(email: string, password: string): Promise<UserCredential> {
        try {
            const userCredential = await signInWithEmailAndPassword(this.afAuth, email, password);
            if (userCredential) {
                return userCredential;
            }
            else {
                throw new Error('User not found');
            }
        } catch (error) {
            throw error;
        }
    }

    // Logout the current user
    public async logout(): Promise<void> {
        try {
            await this.afAuth.signOut();
        } catch (error) {
            throw error;
        }
    }

    // Get the current user UID
    public async getCurrentUserUID(): Promise<string|null> {
        if(this.afAuth.currentUser){
            return this.afAuth.currentUser.uid;
        }
        else {
            return null;
        }
    }
}
