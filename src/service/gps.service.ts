import { Injectable } from "@angular/core";
import { Capacitor } from "@capacitor/core";
import { Geolocation, PermissionStatus } from "@capacitor/geolocation";

@Injectable({
    providedIn: 'root'
})

export class GeolocationService {

    constructor() { }

    public async checkGeolocationPermission(): Promise<boolean> {
        // Check if running on web
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
                await this.requestGeolocationPermission();
                const status = await Geolocation.checkPermissions();
                return status.location === 'granted';
            } catch (error) {
                console.error('Error checking permissions:', error);
                return false;
            }
        }
    }

    public async requestGeolocationPermission(): Promise<boolean> {
        if (Capacitor.getPlatform() === 'web') {
            // Request permission for web
            if ('permissions' in navigator) {
                try {
                    const result = await navigator.permissions.query({ name: 'geolocation' });
                    if (result.state === 'prompt') {
                        // Trigger a geolocation request to prompt the user
                        return new Promise((resolve, reject) => {
                            navigator.geolocation.getCurrentPosition(
                                () => resolve(true),
                                () => resolve(false)
                            );
                        });
                    }
                    return result.state === 'granted';
                } catch {
                    // Fallback for older browsers
                    return new Promise((resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(
                            () => resolve(true),
                            () => resolve(false)
                        );
                    });
                }
            }
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    () => resolve(true),
                    () => resolve(false)
                );
            });
        } else {
            // Request permission for mobile using Capacitor
            try {
                const status = await this.requestGeolocationPermission();
                return status;
            } catch (error) {
                console.error('Error requesting permissions:', error);
                return false;
            }
        }
    }

    async getCurrentLocation(): Promise<{ latitude: number; longitude: number }> {
        try {
            // Check permissions first
            const permissionStatus = await this.checkGeolocationPermission();

            // If no permission, request it
            if (permissionStatus) {
                const requested = await this.requestGeolocationPermission();
                if (!requested) {
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