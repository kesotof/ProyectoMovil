import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { StorageProvider } from "src/managers/StorageProvider";

@Injectable( {
    providedIn: 'root'
})
export class SessionGuard implements CanActivate {

    constructor(private storageProvider: StorageProvider, private router: Router) {}

    async canActivate(): Promise<boolean> {
        const session = await this.storageProvider.get('session')
        if (session) {
            return true
        } else {
            this.router.navigate(['/login'])
            return false
        }
    }
}
