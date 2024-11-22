import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {
  private storage = getStorage();

  async getDefaultProfileImage(): Promise<string> {
    try {
      const imageRef = ref(this.storage, 'user-default/user-default.png');
      return await getDownloadURL(imageRef);
    } catch (error) {
      console.error('Error al obtener imagen por defecto:', error);
      throw error;
    }
  }

  async getDefaultImages(): Promise<string[]> {
    try {
      const imagesRef = ref(this.storage, 'user-default');
      const imagesList = await listAll(imagesRef);
      const urlPromises = imagesList.items.map(async (imageRef) => {
        return await getDownloadURL(imageRef);
      });
      const imageUrls = await Promise.all(urlPromises);
      return imageUrls;
    } catch (error) {
      console.error('Error al obtener imágenes por defecto:', error);
      return [];
    }
  }

  async uploadImage(path: string, dataUrl: string): Promise<string> {
    try {
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const imageRef = ref(this.storage, path);
      await uploadBytes(imageRef, blob);
      return await getDownloadURL(imageRef);
    } catch (error) {
      console.error('Error al subir imagen:', error);
      throw error;
    }
  }
}
