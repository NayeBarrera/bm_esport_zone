import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertController: AlertController,
    private navCtrl: NavController
  ) {
    // Inicialización del formulario reactivo
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // 10 dígitos
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    },
    {
      validator: this.matchPasswords('password', 'confirmPassword')
    });
  }

  ngOnInit() {}

  // Getter para facilitar el acceso a los controles del formulario
  get f() {
    return this.registerForm.controls;
  }

  // Método para verificar que las contraseñas coincidan
  private matchPasswords(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const pass = formGroup.controls[password];
      const confirmPass = formGroup.controls[confirmPassword];

      if (confirmPass.errors && !confirmPass.errors['passwordMismatch']) {
        return;
      }

      if (pass.value !== confirmPass.value) {
        confirmPass.setErrors({ passwordMismatch: true });
      } else {
        confirmPass.setErrors(null);
      }
    };
  }

  // Método para manejar el registro
  async register() {
    if (this.registerForm.invalid) {
      return;
    }

    const { nombre, apellido, correo, telefono, password } = this.registerForm.value;

    // Simular lógica de registro (se puede reemplazar con lógica de API)
    console.log('Registro exitoso:', { nombre, apellido, correo, telefono, password });

    // Mostrar alerta de confirmación
    const alert = await this.alertController.create({
      header: 'Registro Exitoso',
      message: `¡Bienvenido/a, ${nombre} ${apellido}! Tu cuenta ha sido creada exitosamente.`,
      buttons: [
        {
          text: 'Iniciar Sesión',
          handler: () => {
            this.navCtrl.navigateRoot('/login'); // Navegar al login
          },
        },
      ],
    });

    await alert.present();
  }
}
