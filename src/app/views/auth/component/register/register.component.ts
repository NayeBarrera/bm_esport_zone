import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { SetPersonasCommand, SetUsuarioCommand } from 'src/app/models/entities/Entidades';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastController: ToastController,
    private alertController: AlertController,
    private navCtrl: NavController,
    private readonly registerService: RegisterService,

  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.registerForm = this.fb.group({
      idPersonas: [''],
      identificacion: [''],
      nombres: [''],
      apellidos: [''],
      numeroCelular: [''],
      correoElectronico: [''],
      direccion: [''],
      sexo:[''],
      usuarioForm: this.fb.group({
        idUsuario: [''],
        idPersonas: [''],
        idRol: [2],
        nombreUsuario: [''],
        clave: ['', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        ]],
        esActivo: [1]
      })
    })
  }

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
    if (this.registerForm.invalid) return;

    const Formulario = this.registerForm.getRawValue();
    const DatosPersona: SetPersonasCommand = {
      idPersonas: Formulario.idPersonas,
      identificacion: Formulario.identificacion,
      nombres: Formulario.nombres,
      apellidos: Formulario.apellidos,
      numeroCelular: Formulario.numeroCelular,
      correoElectronico: Formulario.correoElectronico,
      direccion: Formulario.direccion,
      sexo: Formulario.sexo,
    };

    this.registerService.setPersona(DatosPersona).subscribe({
      next: (personaResponse) => {
        if (personaResponse.data.isSuccess) {
          const createdPersona = personaResponse.data.data;
          const DatosUsuario: SetUsuarioCommand = {
            idPersonas: createdPersona.idPersonas,
            idRol: Formulario.usuarioForm.idRol,
            nombreUsuario: Formulario.usuarioForm.nombreUsuario,
            clave: Formulario.usuarioForm.clave,
          };

          this.registerService.setUsuario(DatosUsuario).subscribe({
            next: async (UsuarioResponse) => {
              if (UsuarioResponse.data.isSuccess) {
                const toast = await this.toastController.create({
                  message: 'Usuario registrado correctamente',
                  duration: 2000,
                  color: 'success',
                  position: 'bottom'
                });
                await toast.present();

                const alert = await this.alertController.create({
                  header: 'Registro Exitoso',
                  message: `¡Bienvenido/a, ${Formulario.nombres} ${Formulario.apellidos}! Tu cuenta ha sido creada exitosamente.`,
                  buttons: [{
                    text: 'Iniciar Sesión',
                    handler: () => {
                      this.navCtrl.navigateRoot('/login');
                    }
                  }]
                });
                await alert.present();
              } else {
                const toast = await this.toastController.create({
                  message: UsuarioResponse.data.message || 'Error al registrar usuario',
                  duration: 2000,
                  color: 'danger',
                  position: 'bottom'
                });
                await toast.present();
              }
            },
            error: async (error) => {
              const toast = await this.toastController.create({
                message: error.message || 'Error inesperado',
                duration: 2000,
                color: 'danger',
                position: 'bottom'
              });
              await toast.present();
            }
          });
        }
      }
    });
   }
}
