import { Injectable } from "@angular/core";
import { Geolocation, PermissionStatus } from "@capacitor/geolocation";

@Injectable({
    providedIn: 'root'
})

export class GeolocationService {

    constructor() { }

    async checkPermissions(): Promise<PermissionStatus> {
        return await Geolocation.checkPermissions();
    }

    async requestPermissions(): Promise<PermissionStatus> {
        return await Geolocation.requestPermissions();
    }

    async getCurrentLocation(): Promise<{ latitude: number; longitude: number }> {
        try {
            // Check permissions first
            const permissionStatus = await this.checkPermissions();

            // If no permission, request it
            if (permissionStatus.location !== 'granted') {
                const requested = await this.requestPermissions();
                if (requested.location !== 'granted') {
                    throw new Error('Location permission denied');
                }
            }

            // Get current position
            const position = await Geolocation.getCurrentPosition();
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            return { latitude, longitude }
        } catch (error) {
            throw new Error('Problema con obtener la ubicación')
        }
    }

}