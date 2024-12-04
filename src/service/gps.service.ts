import { Injectable } from "@angular/core";
import { Capacitor } from "@capacitor/core";
import { Geolocation, PermissionStatus } from "@capacitor/geolocation";

@Injectable({
    providedIn: 'root'
})

export class GeolocationService {

    constructor() { }

    public async checkGeolocationPermission(): Promise<boolean> {
        if (Capacitor.getPlatform() === 'web') {
            // Browser permission check
            if ('permissions' in navigator) {
                try {
                    const result = await navigator.permissions.query({ name: 'geolocation' });
                    return result.state === 'granted';
                } catch {
                    return 'geolocation' in navigator;
                }
            }
            return 'geolocation' in navigator;
        } else {
            // Mobile permission check
            try {
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
            // Web permission request
            if ('permissions' in navigator) {
                try {
                    const result = await navigator.permissions.query({ name: 'geolocation' });
                    if (result.state === 'prompt') {
                        return new Promise((resolve) => {
                            navigator.geolocation.getCurrentPosition(
                                () => resolve(true),
                                () => resolve(false)
                            );
                        });
                    }
                    return result.state === 'granted';
                } catch {
                    return new Promise((resolve) => {
                        navigator.geolocation.getCurrentPosition(
                            () => resolve(true),
                            () => resolve(false)
                        );
                    });
                }
            }
            return new Promise((resolve) => {
                navigator.geolocation.getCurrentPosition(
                    () => resolve(true),
                    () => resolve(false)
                );
            });
        } else {
            // Mobile permission request
            try {
                const status = await Geolocation.requestPermissions();
                return status.location === 'granted';
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