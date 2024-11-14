import { Injectable } from "@angular/core";
import { SessionManager } from "src/service/session.controller";
import { FirestoreService } from "src/service/firestore.service";


@Injectable({
    providedIn: 'root'
})
export class RegisterUserUseCase {

    constructor(private sessionManager: SessionManager,
        private firestoreService: FirestoreService
    ) { }

    async register(name: string, email: string, password: string): Promise<boolean> {
        // try to register using SessionManager
        try {
            const newUser = await this.sessionManager.register(email, password, name);

            if (newUser == null) {
                throw Error("Fallo en el registro");
            }

            const defaultProfileImageUrl = 'data:image/png;base64,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';
            newUser.profileImageUrl = defaultProfileImageUrl;

            // add pastilleroId to the user
            newUser.pastilleroId = newUser.uid;

            // save the user in firestore
            await this.firestoreService.addUser(newUser);

            return true;
        }
        catch (error: any) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    throw ('El email ya está en uso. Por favor, use otro.');
                case 'auth/invalid-email':
                    throw ('Formato de email inválido.');
                case 'auth/weak-password':
                    throw ('La contraseña debe tener al menos 6 caracteres.');
                default:
                    throw ('Error desconocido: ' + error.message);
            }
            return false;
        }
    }
}
