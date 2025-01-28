// tab4.component.ts
import { Component, OnInit } from '@angular/core';

interface Promocion {
  id: number;
  titulo: string;
  descuento: string;
  descripcion: string;
  vigencia: string;
  codigoQR: string;
}

@Component({
  selector: 'app-tab4',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.scss']
})
export class Tab4Component implements OnInit {
  zonaSeleccionada: string = '';
  promocionesPostres: Promocion[] = [
    {
      id: 1,
      titulo: 'Descuento en Tiramisú',
      descuento: '20%',
      descripcion: 'Disfruta de nuestro delicioso Tiramisú con 20% de descuento',
      vigencia: '31/03/2025',
      codigoQR: 'assets/qr/tiramisu-qr.png'
    },
    {
      id: 2,
      titulo: 'Descuento en Cheesecake',
      descuento: '15%',
      descripcion: 'Prueba nuestro Cheesecake con 15% de descuento',
      vigencia: '31/03/2025',
      codigoQR: 'assets/qr/cheesecake-qr.png'
    }
  ];

  promocionesGaming: Promocion[] = [
    {
      id: 3,
      titulo: '2 Horas + Tiramisú',
      descuento: 'Combo especial',
      descripcion: '2 horas de juego + Tiramisú de cortesía',
      vigencia: '31/03/2025',
      codigoQR: 'assets/qr/gaming-combo-qr.png'
    }
  ];

  constructor() { }

  ngOnInit() { }

  mostrarZona(zona: string) {
    this.zonaSeleccionada = zona;
  }

  getPromocionesActivas(): Promocion[] {
    return this.zonaSeleccionada === 'postres'
      ? this.promocionesPostres
      : this.promocionesGaming;
  }
}
