import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

interface Postre {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

interface Factura {
  numeroFactura: string;
  fecha: Date;
  cliente: {
    nombre: string;
    email: string;
  };
  items: any[];
  total: number;
  metodoPago: string;
}

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  postres: Postre[] = [
    {
      id: 1,
      nombre: 'Cheesecake de Fresa',
      descripcion: 'Tarta de queso con fresa',
      precio: 5.99,
      imagen: 'assets/Cheesecake_fresa.jpg'
    },
    {
      id: 2,
      nombre: 'Cheesecake de Mora',
      descripcion: 'Tarta de queso con mora',
      precio: 4.50,
      imagen: 'assets/Cheesecake_mora.jpg'
    },
    {
      id: 3,
      nombre: 'Cheesecake de Oreo',
      descripcion: 'Tarta de queso con galleta oreo',
      precio: 3.75,
      imagen: 'assets/Cheesecake_Oreo.jpg'
    },
    {
      id: 4,
      nombre: 'Mouse de Maracuya',
      descripcion: 'Tarta de queso cn mora',
      precio: 5.50,
      imagen: 'assets/Mouse_Maracuya.jpg'
    },
    {
      id: 5,
      nombre: 'Flan de Vainilla',
      descripcion: 'Suave y cremoso flan tradicional con caramelo líquido',
      precio: 2.50,
      imagen: 'assets/Flan_Vainilla.jpg'
    },
    {
      id: 6,
      nombre: 'Mouse de Chocolate',
      descripcion: 'Suave mousse de chocolate negro decorado con virutas',
      precio: 6.99,
      imagen: 'assets/Mousse_chocolate.jpg'
    },
    {
      id: 7,
      nombre: 'Gelatina Mosaico',
      descripcion: 'Colorida gelatina de varios sabores con leche condensada',
      precio: 6.99,
      imagen: 'assets/Gelatina_mosaico.jpg'
    }
  ];

  carrito: Postre[] = [];
  factura: Factura | null = null;
  mostrarFactura = false;
  clienteNombre = '';
  clienteEmail = '';
  metodoPago = '';
  fechaPedido: Date = new Date();
  codigoPedido = '';
  mostrarCheckout = false;
  mostrarConfirmacion = false;

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
  }

  agregarAlCarrito(postre: Postre) {
    this.carrito.push(postre);
  }

  calcularTotal(): number {
    return this.carrito.reduce((total, item) => total + item.precio, 0);
  }

  irAResumen() {
    this.navCtrl.navigateForward('/resumen', {
      state: {
        carrito: this.carrito,
        total: this.calcularTotal()
      }
    });
  }

  generarFactura() {
    this.factura = {
      numeroFactura: 'FAC-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      fecha: new Date(),
      cliente: {
        nombre: this.clienteNombre,
        email: this.clienteEmail
      },
      items: this.carrito,
      total: this.calcularTotal(),
      metodoPago: this.metodoPago
    };
    this.mostrarFactura = true;
  }

  imprimirFactura() {
    window.print();
  }

  confirmarPedido() {
    this.fechaPedido = new Date();
    this.codigoPedido = 'PED-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    this.mostrarCheckout = false;
    this.mostrarConfirmacion = true;
    this.generarFactura();
  }
}