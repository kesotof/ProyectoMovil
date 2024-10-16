import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

@Injectable({
    providedIn: 'root'
})
export class StorageProvider {

    private _storage: Storage | null = null

    constructor(private storage: Storage) {
        this.init()
    }

    async init() {
        const storage = await this.storage.create()
        this._storage = storage
    }

    // set a key/value pair
    public async set(key: string, value: any): Promise<any> {
        if (!this._storage) {
            await this.init()
        }
        return this._storage?.set(key, value)
    }

    // get a value by key
    public async get(key: string): Promise<any> {
        if (!this._storage) {
            await this.init()
        } 
        return this._storage?.get(key)
    }

    // remove a key/value pair by key
    public async remove(key: string): Promise<any> {
        if (!this._storage) {
            await this.init()
        }
        return this._storage?.remove(key)
    }

    // clear all data
    public async clear(): Promise<void> {
        if (!this._storage) {
            await this.init()
        }
        return this._storage?.clear()
    }

}