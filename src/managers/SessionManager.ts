import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class SessionManager {
    static register(usuario: string, contrasenna: string) {
      throw new Error('Method not implemented.');
    }

    private userCredentials = [
        ["admin", "admin"],
        ["user", "password"],
    ];



    private isUserActive: boolean;

    constructor() {
        this.isUserActive = false;
    }

    public login(username: string, password: string): boolean {
        // check if username and password are correct
        for (const user of this.userCredentials) {
            if (user[0] === username && user[1] === password) {
                console.log("from: "+this.isUserActive);

                this.isUserActive = true;
                console.log("to: "+this.isUserActive);
                return true;
            }
        }
        return false;
    }

    logout(): boolean {
        this.isUserActive = false;
        return true;
    }

    public register(username: string, password: string): boolean {
        // check if username is already taken
        console.log("username: "+username);
        console.log("passw: "+password);

        // check if username is already taken
        for (const user of this.userCredentials) {
            if (user[0] === username) {
                return false;
            }
        }
        // add new user
        this.userCredentials.push([username, password]);
        return true;
    }

    isUserLoggedIn(): boolean {
        console.log("isUserActive: "+this.isUserActive);
        return this.isUserActive;
    }

}
