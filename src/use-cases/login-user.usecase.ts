import { Injectable } from "@angular/core";
import { SessionManager } from "src/service/session.controller";
import { FirestoreService } from "src/service/firestore.service";
import { User } from "src/interfaces/User";


@Injectable({
    providedIn: 'root'
})
export class LoginUserUseCase {
    constructor(
        private sessionManager: SessionManager,
        private firestoreService: FirestoreService) { }

    async login(username: string, password: string): Promise<boolean> {
        // try to login using SessionManager
        try {
            // this login and set the current user in the local storage
            const loginResult = await this.sessionManager.loginUser(username, password);
            if (!loginResult) {
                throw Error("Fallo en el login");
            }

            // get user data from the login result
            let currentUser = await this.sessionManager.getActiveUser();

            // get all user data from firebase
            const userUid = currentUser?.uid;
            let user = await this.firestoreService.getUser(userUid);

            // set all user data using session controller
            this.sessionManager.setActiveUser(user);

            // this.sessionManager.setActiveUser(user);
            return true;

        }
        catch (error) {
            console.error('Login error:', error);
            return false;
        }

    }
}