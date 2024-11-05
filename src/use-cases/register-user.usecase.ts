import { Injectable } from "@angular/core";
import { SessionManager } from "src/service/session.controller";


@Injectable({
    providedIn: 'root'
})
export class RegisterUserUseCase {
    
    constructor(private sessionManager: SessionManager) {}

    async register(name: string, email:string, password: string): Promise<boolean> {
        // try to register using SessionManager
        try{
            const registerResult = await this.sessionManager.register(email, password);
            return registerResult;
        }
        catch(error: any){
            switch (error.code) {
            case 'auth/email-already-in-use':
                throw('El email ya está en uso. Por favor, use otro.');
            case 'auth/invalid-email':
                throw('Formato de email inválido.');
            case 'auth/weak-password':
                throw('La contraseña debe tener al menos 6 caracteres.');
            default:
                throw('Error desconocido: ' + error.message);
            }
            return false;
        }
    }
}