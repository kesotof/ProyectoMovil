import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManager } from '../../managers/SessionManager';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  protected username: string = "";
  protected password1: string = "";
  protected password2: string = "";

  constructor(
    private router : Router,
    private sessionManager : SessionManager,
    private alertController : AlertController,
  ) { }

  showAlert(header:string, message:string){
    const alert = this.alertController.create({
      header: header,
      message: message,
      buttons: ['Aceptar'],
    }).then(alert => alert.present());
  }

  OnRegisterButtonPressed(){
    // validate non-empty fields
    if(this.username === "" || this.password1 === "" || this.password2 === ""){
      this.showAlert("Error", "Por favor llene todos los campos");
      return;
    }

    // validate passwords
    if(this.password1 != this.password2){
      this.showAlert("Error", "Las contraseñas no coinciden");
      return;
    }
    this.sessionManager.register(this.username, this.password1);
    this.resetForm();
    this.showAlert("Registro exitoso", "Usuario registrado exitosamente");
    this.router.navigate(['/login']);
  }

  resetForm(){
    this.username = "";
    this.password1 = "";
    this.password2 = "";
  }

  ngOnInit() {
  }

}
