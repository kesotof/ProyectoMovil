import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class SessionManager {
  private userCredentials = [
    {
        username: "user",
        password: "pass",
        email: "user@test.com"
    },
];

private activeUser: { username: string, password: string, email: string } | null;
private isUserActive: boolean;

constructor() {
    this.isUserActive = false;
    this.activeUser = null;
}

public login(username: string, password: string): boolean {
    // check if username and password are correct
    for (const user of this.userCredentials) {
        if (user.username === username && user.password === password) {
            this.activeUser = user;
            return true;
        }
    }
    return false;
}

public logout(): boolean {
    this.activeUser = null;
    return true;
}

public register(username: string, password: string, email: string): boolean {
    // check if username is already taken
    console.log("username: "+username);
    console.log("email: "+email);
    console.log("passw: "+password);

    for (const user of this.userCredentials) {
        if (user.username === username) {
            return false;
        }
    }

    // add new user
    let newUser = {
        username: username,
        password: password,
        email: email
    }
    this.userCredentials.push(newUser);
    return true;
}

getUserData(){
    if (!this.activeUser) {
        return null;
    }

    return {
        email: this.activeUser.email,
        username: this.activeUser.username
    }
}

isUserLoggedIn(): boolean {
    console.log("isUserActive: "+this.isUserActive);
    return this.isUserActive;
}

}
