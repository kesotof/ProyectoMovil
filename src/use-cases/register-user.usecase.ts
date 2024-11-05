import { Injectable } from "@angular/core";
import { SessionManager } from "src/service/session.controller";
import { FirestoreService } from "src/service/firestore.service";


@Injectable({
    providedIn: 'root'
})
export class RegisterUserUseCase {
    
    constructor(private sessionManager: SessionManager,
                private firestoreService: FirestoreService
    ) {}

    async register(name: string, email:string, password: string): Promise<boolean> {
        // try to register using SessionManager
        try{
            const newUser = await this.sessionManager.register(email, password);
            
            if (newUser == null) {
                throw Error("Fallo en el registro");
            }

            // save the user in firestore
            await this.firestoreService.addUser(newUser);

            return true;
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