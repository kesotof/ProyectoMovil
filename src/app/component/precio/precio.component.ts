import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';

interface Precio {
  nombre: string;
  id: string;
  farmacia: string;
  precio: number;
  imagen: string;
  url: string;
}

@Component({
  selector: 'app-precio',
  templateUrl: './precio.component.html',
  styleUrls: ['./precio.component.scss'],
})
export class PrecioComponent implements OnInit {
  @Input() medicina: any;
  @Input() medicamentoId: string | undefined;
  precios: Precio[] = [];
  noPreciosDisponibles: boolean | undefined;

  constructor(
    private modalController: ModalController,
    private firestore: Firestore
  ) {}

  async ngOnInit() {
    await this.cargarPrecios();
  }

  async cargarPrecios() {
    try {
      if (!this.medicamentoId) {
        console.log('ID del medicamento no definido');
        return;
      }

      const preciosRef = collection(this.firestore, 'precios');
      const querySnapshot = await getDocs(preciosRef);

      querySnapshot.forEach((doc) => {
        const datos = doc.data();
        if (doc.id === this.medicamentoId) {
          for(let i = 1; i <= 4; i++) {
            if(datos[i]) {
              this.precios.push(datos[i] as Precio);
            }
          }
        }
      });

      if (this.precios.length === 0) {
        this.noPreciosDisponibles = true;
      }

    } catch (error) {
      console.error('Error al cargar precios:', error);
      this.noPreciosDisponibles = true;
    }
}

  cerrarModal() {
    this.modalController.dismiss();
  }

  abrirURL(url: string) {
    window.open(url, '_blank');
  }
}
