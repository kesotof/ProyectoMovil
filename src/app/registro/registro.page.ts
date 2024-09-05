import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManager } from '../../managers/SessionManager';
import { AlertManager } from '../../managers/AlertManager';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  protected username: string = "";
  protected email: string = "";
  protected password1: string = "";
  protected password2: string = "";

  constructor(
    private router : Router,
    private sessionManager : SessionManager,
    private alertManager : AlertManager,
  ) { }

  OnRegisterButtonPressed(){
    // validate non-empty fields
    if(this.username === "" ||
      this.password1 === "" ||
      this.password2 === "" ||
      this.email === ""){
      this.alertManager.showAlert("Error", "Por favor llene todos los campos");
      return;
    }

    // validate passwords
    if(this.password1 != this.password2){
      this.alertManager.showAlert("Error", "Las contraseñas no coinciden");
      return;
    }
    this.sessionManager.register(this.username, this.password1, this.email);
    this.resetForm();
    this.alertManager.showAlert("Registro exitoso", "Usuario registrado exitosamente");
    this.router.navigate(['/login']);
  }

  resetForm(){
    this.username = "";
    this.password1 = "";
    this.password2 = "";
    this.email = "";
  }

  ngOnInit() {
  }

}
