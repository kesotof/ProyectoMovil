import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class LocalStorage {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async get(key: string): Promise<any> {
    return this._storage?.get(key);
  }

  async set(key: string, value: any): Promise<any> {
    return this._storage?.set(key, value);
  }

  public async remove(key: string): Promise<any> {
    if (!this._storage) {
      await this.init();
    }
    return this._storage?.remove(key);
  }
}
