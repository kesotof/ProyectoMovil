import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, Output, EventEmitter, Input } from '@angular/core';
import * as L from 'leaflet';
import { latLng, tileLayer, LatLng } from 'leaflet';
import { GeolocationService } from 'src/service/gps.service';

interface Coordinates {
  lat: number;
  lng: number;
}

interface MapOptions {
  layers: Array<{
    url: string;
    attribution: string;
  }>;
  zoom: number;
  center: [number, number];
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy, OnChanges {

  constructor(private geolocationService: GeolocationService) { }

  private map: L.Map | null = null;
  private currentLocation: Coordinates = { lat: 0, lng: 0 };
  private isMapInitialized = false;
  private fallbackCoordinates: Coordinates = { lat: -33.447487, lng: -70.673676 }
  private initCoordinates: Coordinates = this.fallbackCoordinates;
  public isLoading = true;
  private currentMarkers: L.Marker[] = [];

  @Input() mapCenter!: Coordinates;
  @Input() zoom!: number;
  @Input() markers!: Coordinates[];
  @Input() isCenterMarked!: boolean;

  @Output() mapLoadingChange = new EventEmitter<boolean>();

  private readonly optionsSpec: MapOptions = {
    layers: [{
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }],
    zoom: 13,
    center: [-33.4489, -70.6693]
  };

  private readonly options = {
    layers: [tileLayer(this.optionsSpec.layers[0].url, {
      maxZoom: 18,
      attribution: this.optionsSpec.layers[0].attribution
    })],
    zoom: this.optionsSpec.zoom,
    center: latLng(this.initCoordinates.lat, this.initCoordinates.lng)
  };

  private async setupLocationAndMap(): Promise<void> {
    try {
      // Check permissions first
      const permStatus = await this.geolocationService.checkGeolocationPermission();

      if (permStatus) {
        // Show some UI explaining why we need location
        // Then request permission
        await this.geolocationService.requestPermissions();
      }

      // Initialize map with current location
      this.currentLocation = await this.getCurrentLocation();
      await this.initializeMap(this.currentLocation);

    } catch (error) {
      console.error('Location setup failed:', error);
      // Fallback to default location
      this.initializeMap(this.fallbackCoordinates);
    }
  }

  async ngOnInit(): Promise<void> {
    if (this.isMapInitialized) {
      return;
    }

    this.mapLoadingChange.emit(true);
    try {
      await this.setupLocationAndMap();
      this.isMapInitialized = true;
    } catch (error) {
      console.error('Map initialization failed:', error);
    } finally {
      this.isLoading = false;
      this.mapLoadingChange.emit(false);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.map) return;

    if (changes['mapCenter'] && !changes['mapCenter'].isFirstChange()) {
      const newCenter = changes['mapCenter'].currentValue;
      this.map.setView(new L.LatLng(newCenter.lat, newCenter.lng), this.zoom);
      console.log('mapCenter changed: ', changes['mapCenter'].currentValue); //!!!
    }

    if (changes['zoom'] && !changes['zoom'].isFirstChange()) {
      this.map.setZoom(changes['zoom'].currentValue);
      console.log('zoom changed: ', changes['zoom'].currentValue); //!!!
    }

    if (changes['markers'] && !changes['markers'].isFirstChange()) {
      this.clearMarkers();
      this.addMarkers(changes['markers'].currentValue);
      console.log('markers changed: ', changes['markers'].currentValue);// !!!
    }

    if (changes['isCenterMarked'] && !changes['isCenterMarked'].isFirstChange()) {
      // if true, mark the center
      if (changes['isCenterMarked'].currentValue) {
        this.enableCenterMarker();
      }
      // clear the center if not
      else {
        this.clearCenterMarker();
      }
      console.log('isCenterMarked changed: ', changes['isCenterMarked'].currentValue);
    }

  }
  clearCenterMarker() {
    throw new Error('Method not implemented.');
  }
  enableCenterMarker() {
    throw new Error('Method not implemented.');
  }

  private addMarkers(coordinates: Coordinates[]): void {
    if (!this.map) return;

    // Create custom icon for markers
    const customIcon = L.icon({
      iconUrl: 'assets/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    // Add new markers
    coordinates.forEach(coord => {
      const marker = L.marker([coord.lat, coord.lng], { icon: customIcon })
        .bindPopup('Location Details')
        .addTo(this.map!);

      this.currentMarkers.push(marker);
    });

    // If there are markers, fit the map bounds to show all markers
    if (this.currentMarkers.length > 0) {
      const group = L.featureGroup(this.currentMarkers);
      this.map.fitBounds(group.getBounds(), {
        padding: [50, 50]
      });
    }
  }

  clearMarkers() {
    // Remove all existing markers from the map
    this.currentMarkers.forEach(marker => marker.remove());
    this.currentMarkers = [];
  }

  private initializeMap(initCoordinates: Coordinates): Promise<void> {
    return new Promise((resolve) => {
      // init the map
      this.map = L.map('map', {
        center: latLng(initCoordinates.lat, initCoordinates.lng),
        zoom: this.options.zoom,
        layers: this.options.layers
      });
      resolve();
    });
  }

  private loadTiles(): Promise<void> {
    return new Promise((resolve) => {
      if (!this.map) {
        resolve();
        return;
      }

      const tileLayer = this.options.layers[0];
      tileLayer.on('load', () => {
        setTimeout(resolve, 100);
      });
    });
  }

  private refreshMap(): void {
    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
      }
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
      this.isMapInitialized = false;
    }
  }


  async getCurrentLocation(): Promise<Coordinates> {
    try {
      let result = await this.geolocationService.getCurrentLocation();
      return { lat: result.latitude, lng: result.longitude };

    }
    catch {
      return this.fallbackCoordinates;
    }
  }
}


