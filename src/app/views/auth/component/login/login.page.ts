import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({});

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  authenticate() {
    if (this.loginForm.valid) {
      console.log('Formulario válido, intentando autenticar...');
      this.authService.login(
        this.loginForm.value.username!,
        this.loginForm.value.password!
      ).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          if (response.isSuccess && response.data) {
            console.log('Autenticación exitosa');
            // El token ya se guarda en el servicio de autenticación
            this.navCtrl.navigateForward('/tabs');
          } else {
            console.warn('La autenticación no fue exitosa:', response);
            this.presentAlert('Error de autenticación', response.message || 'No se pudo autenticar. Por favor, intente de nuevo.');
          }
        },
        error: (error) => {
          console.error('Error durante la autenticación:', error);
          this.presentAlert('Error', 'Ocurrió un error durante la autenticación. Por favor, intente más tarde.');
        }
      });
    } else {
      console.warn('Formulario inválido');
      this.presentAlert('Formulario inválido', 'Por favor, complete todos los campos correctamente.');
    }
  }

  registrarse(){
    this.navCtrl.navigateForward('/register');
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Aceptar'],
    });

    await alert.present();
  }
}
