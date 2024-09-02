import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder,
    public alertController:AlertController,
    public navCtrl: NavController) {

    this.formularioLogin = fb.group({
      'nombre': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required),
    })

  }
  ngOnInit() {
  }

  async ingresar() {
    var f = this.formularioLogin.value;
    if (!f.nombre || !f.password) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Debes rellenar los campos',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }
    var usuarioString = localStorage.getItem('usuario');
    if (usuarioString !== null) {
      var usuario = JSON.parse(usuarioString);
      if (usuario.nombre == f.nombre && usuario.password == f.password) {
        console.log('Ingresado');
        localStorage.setItem('ingresado', 'true');
        this.navCtrl.navigateRoot("tabs/menu");
      } else {
        const alert = await this.alertController.create({
          header: 'Datos incorrectos',
          message: 'No existe ninguna cuenta con estos datos',
          buttons: ['Volver a intentar'],
        });
        await alert.present();
      }
    }
  }
}
