import { Injectable } from "@angular/core";
import { FirebaseAuthService } from "./firebase-auth.service";
import { LocalStorage } from "src/service/localstorage.service";
import { User as UserApp } from "src/interfaces/User";
import { User as UserFirebse } from "firebase/auth";


@Injectable({
    providedIn: 'root'
})
export class SessionManager {

    constructor(private afAuth: FirebaseAuthService,
        private localStorage: LocalStorage
    ) { }

    private activeUser: UserApp | null = null;

    public async loginUser(email: string, password: string): Promise<boolean> {
        try {
            let userCredential;
            userCredential = await this.afAuth.login(email, password);
            if (userCredential) {
                let userUID = await this.afAuth.getCurrentUserUID();
                this.initActiveUser(userUID);
                return true;
            }
            return true;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    }

    public async logout(): Promise<boolean> {
        try {
            await this.afAuth.logout();
            this.cleanActiveUser();
            return true;
        } catch (error) {
            console.error('Logout error:', error);
            return false;
        }
    }

    public async register(email: string, password: string, name: string): Promise<UserApp | null> {
        try {
            let userCredential = await this.afAuth.register(email, password);
            if (userCredential) {
                let newUser: UserApp = {
                    uid: userCredential.user.uid,
                    email: email,
                    name: name,
                    pastilleroId: null,
                };
                return newUser;
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.error('session manager Registration error:', error);
            throw error;
        }
    }

    public isUserLoggedIn(): boolean {
        return this.activeUser !== null;
    }

    public async getActiveUser(): Promise<UserApp | null> {
        let user = await this.localStorage.get('activeUser');
        this.activeUser = user;
        return this.activeUser;
    }

    public getUserUid(): string | null {
        return this.activeUser?.uid || null;
    }

    public getPastilleroId(): string | null {
        return this.activeUser?.pastilleroId || null;
    }

    private async saveActiveUser(): Promise<void> {
        await this.localStorage.set('activeUser', this.activeUser);
    }

    private cleanActiveUser(): void {
        this.activeUser = null;
        this.localStorage.remove('activeUser');
    }

    private async initActiveUser(userUid: string | null): Promise<boolean> {
        try {
            if (userUid) {
                if (this.activeUser) {
                    this.activeUser.uid = userUid;
                    await this.saveActiveUser();
                } else {
                    this.activeUser = {
                        uid: userUid,
                        email: '',
                        name: '',
                        pastilleroId: null,
                    };
                    await this.saveActiveUser();
                }
            } else {
                this.activeUser = null;
                await this.saveActiveUser();
            }
            return true;
        } catch (error) {
            console.error('Error setting active user:', error);
            return false;
        }
    }

    public setActiveUser(user: any) {
        this.activeUser = user;
        this.saveActiveUser();
    }
}

