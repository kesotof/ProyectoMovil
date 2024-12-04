import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseStorageService } from 'src/service/firebase-storage.service';

@Injectable({
  providedIn: 'root'
})
export class agregarComUseCase {
  constructor(
    private firestore: AngularFirestore,
    private storageService: FirebaseStorageService
  ) {}

  async execute(sintomaNombre: string, comentarioData: any, imageUrl?: string, userId?: string): Promise<void> {
    if (imageUrl) {
      const imagePath = `images/${sintomaNombre}/${new Date().getTime()}.png`;
      comentarioData.imageUrl = await this.storageService.uploadImage(imagePath, imageUrl);
    }
    comentarioData.timestamp = new Date();
    comentarioData.userId = userId;
    await this.firestore
      .collection('comentarios')
      .doc(sintomaNombre)
      .collection('comentarios')
      .add(comentarioData);
  }
}
