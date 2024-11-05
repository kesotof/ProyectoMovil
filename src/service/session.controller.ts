import { Injectable } from "@angular/core";
import { FirebaseAuthService } from "./firebase-auth.service";
import { User as UserApp } from "src/interfaces/User";
import { User as UserFirebse} from "firebase/auth";


@Injectable({
    providedIn: 'root'
})
export class SessionManager {

    private activeUser: UserApp | null = null;

    constructor(private afAuth: FirebaseAuthService) {}

    public getActiveUser(): UserApp | null {
        return this.activeUser;
    }

        public async loginUser(email: string, password: string): Promise<boolean> {
        try {
            let userCredential;
            userCredential = await this.afAuth.login(email, password);
            if (userCredential) {
                let userUID = await this.afAuth.getCurrentUserUID();
                this.setActiveUser(userUID);
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
            this.setActiveUser(null);
            return true;
        } catch (error) {
            console.error('Logout error:', error);
            return false;
        }
    }

    public async register(email: string, password: string): Promise<boolean> {
        try {
            let userCredential = await this.afAuth.register(email, password);
            console.log(userCredential);
            if (userCredential) {
                let userUID = await this.afAuth.getCurrentUserUID();
                this.setActiveUser(userUID);
                return true;
                }
            else {
                return false;
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

    private setActiveUser(userUid: string|null) {
        if (userUid) {
            console.log("to implement");
        } else {
            this.activeUser = null;
        }
    }
}

