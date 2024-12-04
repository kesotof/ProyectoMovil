import { Injectable } from "@angular/core";
import { Capacitor } from "@capacitor/core";
import { Geolocation, PermissionStatus } from "@capacitor/geolocation";

@Injectable({
    providedIn: 'root'
})

export class GeolocationService {

    constructor() { }

    public async checkGeolocationPermission(): Promise<boolean> {
        // Check if running on web or mobile
        if (Capacitor.getPlatform() === 'web') {
            // Browser permission check
            if ('permissions' in navigator) {
                try {
                    const result = await navigator.permissions.query({ name: 'geolocation' });
                    return result.state === 'granted';
                } catch {
                    // Fallback for older browsers
                    return 'geolocation' in navigator;
                }
            }
            return 'geolocation' in navigator;
        } else {
            // Mobile permission check using Capacitor
            try {
                const status = await Geolocation.checkPermissions();
                return status.location === 'granted';
            } catch (error) {
                console.error('Error checking permissions:', error);
                return false;
            }
        }
    }

    async requestPermissions(): Promise<PermissionStatus> {
        return await Geolocation.requestPermissions();
    }

    async getCurrentLocation(): Promise<{ latitude: number; longitude: number }> {
        try {
            // Check permissions first
            const permissionStatus = await this.checkGeolocationPermission();

            // If no permission, request it
            if (permissionStatus) {
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