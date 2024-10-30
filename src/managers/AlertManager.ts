import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";

@Injectable({
    providedIn: 'root'
})
export class AlertManager {
    constructor(private alertController: AlertController) {
    }

    public showAlert(header:string, message:string){
        this.alertController.create({
          header: header,
          message: message,
          buttons: ['Aceptar'],
        }).then(alert => alert.present());
      }
}
export { AlertController };

