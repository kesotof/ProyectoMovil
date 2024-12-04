import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class ImageComService {
  constructor(private storage: AngularFireStorage) {}

  async getImageFromCamera(): Promise<{ success: boolean, imageUrl?: string }> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });
      return { success: true, imageUrl: image.dataUrl };
    } catch (error) {
      return { success: false };
    }
  }

  async getImageFromGallery(): Promise<{ success: boolean, imageUrl?: string }> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
      });
      return { success: true, imageUrl: image.dataUrl };
    } catch (error) {
      return { success: false };
    }
  }

  uploadImage(path: string, dataUrl: string) {
    const ref = this.storage.ref(path);
    const task = ref.putString(dataUrl, 'data_url');
    return task;
  }
}
