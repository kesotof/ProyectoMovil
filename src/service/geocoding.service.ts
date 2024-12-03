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
}