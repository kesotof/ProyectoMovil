import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface GeocodingResult {
    lat: number;
    lng: number;
    displayName: string;
    type: string;
    confidence: number;
}

export interface ReverseGeocodingResult {
    address: {
        road?: string;
        city?: string;
        state?: string;
        country?: string;
        postcode?: string;
    };
    displayName: string;
}

@Injectable({
    providedIn: 'root'
})
export class GeocodingService {
    private readonly baseUrl = 'https://nominatim.openstreetmap.org';
    private readonly defaultParams = {
        format: 'json',
        limit: '1'
    };

    constructor(private http: HttpClient) { }

    /**
     * Search coordinates for a given place name/address
     * @param query The place name or address to search for
     * @returns An Observable of GeocodingResult
     */
    searchCoordinates(query: string): Observable<GeocodingResult> {
        const params = {
            ...this.defaultParams,
            q: query
        };

        return this.http.get<any[]>(`${this.baseUrl}/search`, { params })
            .pipe(
                map(response => {
                    if (!response.length) {
                        throw new Error('Location not found');
                    }
                    const result = response[0];
                    return {
                        lat: Number(result.lat),
                        lng: Number(result.lon),
                        displayName: result.display_name,
                        type: result.type,
                        confidence: Number(result.importance)
                    };
                })
            );
    }

    /**
     * Search place information for given coordinates
     * @param coordinates Object containing lat and lng
     * @returns An Observable of ReverseGeocodingResult
     */
    searchPlace(coordinates: { lat: number; lng: number }): Observable<ReverseGeocodingResult> {
        const params = {
            ...this.defaultParams,
            lat: coordinates.lat.toString(),
            lon: coordinates.lng.toString()
        };

        return this.http.get<any>(`${this.baseUrl}/reverse`, { params })
            .pipe(
                map(response => ({
                    address: {
                        road: response.address?.road,
                        city: response.address?.city,
                        state: response.address?.state,
                        country: response.address?.country,
                        postcode: response.address?.postcode
                    },
                    displayName: response.display_name
                }))
            );
    }

    public findNearbyHospitals(coordinates: { lat: number; lng: number }): Observable<GeocodingResult[]> {
        // get user city

        // Search parameters optimized for Chile
        const params = {
            format: 'json',
            q: 'hospital',
            lat: coordinates.lat.toString(),
            lon: coordinates.lng.toString(),
            countrycodes: 'cl',
            limit: '5',
            radius: '2000'
        };

        return this.http.get<any[]>(`${this.baseUrl}/search`, { params })
            .pipe(
                map(response => {
                    if (!response.length) {
                        throw new Error('No hospitals found nearby');
                    }
                    console.log(response);

                    // Map and sort by distance
                    return response
                        .map(result => ({
                            lat: Number(result.lat),
                            lng: Number(result.lon),
                            displayName: result.display_name,
                            type: result.type,
                            confidence: Number(result.importance)
                        }))
                        .sort((a, b) =>
                            this.calculateDistance(coordinates, a) -
                            this.calculateDistance(coordinates, b)
                        )
                        .slice(0, 3); // Return closest 3
                })
            );
    }

    private calculateDistance(point1: { lat: number; lng: number }, point2: { lat: number; lng: number }): number {
        const R = 6371; // Earth's radius in km
        const dLat = this.toRad(point2.lat - point1.lat);
        const dLon = this.toRad(point2.lng - point1.lng);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRad(point1.lat)) * Math.cos(this.toRad(point2.lat)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    private toRad(degrees: number): number {
        return degrees * Math.PI / 180;
    }
}