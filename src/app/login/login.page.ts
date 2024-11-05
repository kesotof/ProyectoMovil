import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertManager } from '../../managers/AlertManager';
import { LoginUserUseCase } from 'src/use-cases/login-user.usecase';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private alertManager: AlertManager,
    private loginUserUseCase: LoginUserUseCase
  ) { }

  ngOnInit() {
    this.resetFields();
  }

  resetFields() {
    this.email = '';
    this.password = '';
  }

  async onLoginButtonClick() {
    // try {
    //   const userCredential = await this.sessionManager.loginWithEmail(this.email, this.password);
    //   const user = userCredential.user;
    //   if (user) {
    //     const db = getDatabase();
    //     const userRef = ref(db, `users/${user.uid}`);
    //     const snapshot = await get(userRef);
    //     if (snapshot.exists()) {
    //       const userData = snapshot.val();
    //       const username = userData.username;
    //       await this.storageProvider.set('currentUsername', username);
    //       await this.storageProvider.set('session', true);
    //       this.router.navigate(['/splash']);
    //     } else {
    //       this.alertManager.showAlert('Error', 'No se encontró información del usuario');
    //     }
    //   }
    // } catch (error) {
    //   this.alertManager.showAlert('Error', 'No se pudo iniciar sesión, intenta de nuevo.');
    // }

    // login using firebase auth service
    try {
      let result = await this.loginUserUseCase.login(this.email, this.password);
      if(result){
        console.log('Login successful');
      }
      else{
        console.log('Login failed');
      }
  } catch (error) {
      console.log(error);
  }}

  onRegisterButtonClick() {
    this.router.navigate(['/registro']);
  }
}
