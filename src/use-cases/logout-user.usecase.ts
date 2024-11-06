import { Injectable } from "@angular/core";
import { SessionManager } from "src/service/session.controller";
import { LocalStorage } from "src/service/localstorage.service";

@Injectable({
    providedIn: 'root'
})
export class LogoutUserUseCase {
    constructor(
        private sessionManager: SessionManager,
        private localStorage: LocalStorage
    ) { }

    async logout(): Promise<boolean> {
        try {
            // this logout and clean the current user in the local storage
            const logoutResult = await this.sessionManager.logout();
            if (!logoutResult) {
                throw Error("Fallo en el logout en sessionManager");
            }
            // Elimina el pastillero del local storage
            await this.localStorage.remove('pastillero');
            return true;
        } catch (error) {
            console.error('Logout UC error:', error);
            return false;
        }
    }
}
