import { Injectable } from "@angular/core";
import { SessionManager } from "src/service/session.controller";


@Injectable({
    providedIn: 'root'
})
export class LogoutUserUseCase {
    constructor(
        private sessionManager: SessionManager) { }

    async logout(): Promise<boolean> {
        try {
            // this logout and clean the current user in the local storage
            const logoutResult = await this.sessionManager.logout();
            if (!logoutResult) {
                throw Error("Fallo en el logout en sessionManager");
            }
            return true;

        }
        catch (error) {
            console.error('Logout UC error:', error);
            return false;
        }

    }
}