// tab5.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Añade esta importación

interface Usuario {
  nombre: string;
  email: string;
  telefono: string;
  apellido: string;
}

@Component({
  selector: 'app-tab5',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class Tab5Component implements OnInit {
  usuario: Usuario = {
    nombre: '',
    email: '',
    telefono: '',
    apellido: ''
  };

  seccionActual: string = '';

  constructor(private router: Router) { } // Añade el Router al constructor

  ngOnInit() { }

  verSeccion(seccion: string) {
    this.seccionActual = seccion;
  }

  handleInput(event: any, campo: keyof Usuario) {
    const input = event as CustomEvent;
    if (input.detail?.value !== undefined) {
      this.usuario[campo] = input.detail.value;
    }
  }

  guardarCambios() {
    console.log('Guardando cambios:', this.usuario);
    // Aquí iría la lógica para guardar los cambios
  }

  cancelarEdicion() {
    this.seccionActual = '';
  }

  eliminarCuenta() {
    if(confirm('¿Estás seguro de que deseas eliminar tu cuenta?')) {
      // Aquí iría la lógica para eliminar la cuenta
    }
  }

  cerrarSesion() {
    // Implementa la lógica para cerrar sesión
    // Por ejemplo:
    // this.authService.logout();
    this.router.navigate(['/login']);
  }
}
