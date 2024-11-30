import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, Output, EventEmitter, Input } from '@angular/core';
import * as L from 'leaflet';
import { latLng, tileLayer, LatLng } from 'leaflet';

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
  private map: L.Map | null = null;
  private isMapInitialized = false;
  public isLoading = true;

  @Input() initCoordinates: Coordinates = { lat: -33.4489, lng: -70.6693 };
  @Input() setMapCenter!: Coordinates;
  @Input() setZoom!: number;
  @Input() drawMarker!: Coordinates;

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

  async ngOnInit(): Promise<void> {
    if (this.isMapInitialized) {
      return;
    }

    this.mapLoadingChange.emit(true);
    try {
      await this.initializeMap();
      await this.loadTiles();
      this.refreshMap();
      this.isMapInitialized = true;
    } catch (error) {
      console.error('Error initializing map:', error);
    } finally {
      this.isLoading = false;
      this.mapLoadingChange.emit(false);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.map) return;

    if (changes['setMapCenter']) {
      const { lat, lng } = changes['setMapCenter'].currentValue;
      this.map.setView(latLng(lat, lng), this.map.getZoom());
    }

    if (changes['setZoom']) {
      this.map.setZoom(changes['setZoom'].currentValue);
    }

    if (changes['drawMarker']) {
      const { lat, lng } = changes['drawMarker'].currentValue;
      const marker = L.marker([lat, lng]).addTo(this.map);
      marker.bindPopup('You are here').openPopup();
    }
  }

  private initializeMap(): Promise<void> {
    return new Promise((resolve) => {
      this.map = L.map('map', {
        center: latLng(this.initCoordinates.lat, this.initCoordinates.lng),
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
}