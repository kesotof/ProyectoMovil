import { Injectable } from "@angular/core";
import { SessionManager } from "src/service/session.controller";


@Injectable({
    providedIn: 'root'
})
export class LoginUserUseCase {
    constructor(private sessionManager: SessionManager) {}

    async login(username: string, password: string): Promise<boolean> {
        // try to login using SessionManager
        try{
            const loginResult = await this.sessionManager.loginUser(username, password);
            return loginResult;
        }
        catch(error){
            console.error('Login error:', error);
            return false;
        }
    }
}