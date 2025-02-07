import { Producto } from './../../../../models/entities/Entidades';
import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ProductosService } from 'src/app/views/shared/services/productos.service';
import { CartService } from 'src/app/views/shared/services/cart.service';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/views/shared/services/event.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class Tab3Page implements OnInit {
  rutacompleta = environment.baseUrl;
  defaultImageUrl = 'assets/logo.png';
  productos: Producto[] = [];
  private subscription: Subscription;

  constructor(
    private navCtrl: NavController,
    private readonly productosservices: ProductosService,
    private cartService: CartService,
    private toastController: ToastController,
    private eventService: EventService
  ) {
    this.subscription = this.eventService.reloadProducts$.subscribe(() => {
      this.cargarproductos();
    });
  }

  ngOnInit() {
    this.cargarproductos();
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  getImageUrl(rutaAdjunto: string | undefined | null): string {
    if (!rutaAdjunto) {
      return this.defaultImageUrl;
    }
    return `${this.rutacompleta}/${rutaAdjunto}`;
  }

  cargarproductos() {
    this.productosservices.getProdcutos().subscribe({
      next: (response) => {
        this.productos = response.data.data;
        console.log("Productos", this.productos);
      },
      error: (error) => console.error('Error al cargar productos:', error)
    });
  }

  async agregarAlCarrito(producto: Producto) {
    if (producto.stock && producto.stock > 0) {
      try {
        // Primero actualizamos el stock en el backend
        const stockCommand = {
          idProductos: producto.idProductos,
          nombreProdcuto: producto.nombreProdcuto,
          precio: producto.precio,
          stock: producto.stock - 1, // Reducimos el stock en 1
          idAdjuntos: producto.idAdjuntos,
          esActivo: producto.esActivo
        };

        this.productosservices.actualizarStock(stockCommand).subscribe({
          next: async (response) => {
            // Si la actualización del stock fue exitosa, agregamos al carrito
            this.cartService.addToCart(producto, 1);
            producto.stock!--; // Actualizamos el stock en la vista

            // Mostramos mensaje de éxito
            const toast = await this.toastController.create({
              message: 'Producto agregado al carrito',
              duration: 2000,
              position: 'bottom',
              color: 'success'
            });
            toast.present();
          },
          error: async (error) => {
            console.error('Error al actualizar el stock:', error);
            const toast = await this.toastController.create({
              message: 'Error al agregar el producto',
              duration: 2000,
              position: 'bottom',
              color: 'danger'
            });
            toast.present();
          }
        });
      } catch (error) {
        console.error('Error al procesar la solicitud:', error);
      }
    } else {
      const toast = await this.toastController.create({
        message: 'No hay stock disponible',
        duration: 2000,
        position: 'bottom',
        color: 'warning'
      });
      toast.present();
    }
  }

  irACarrito() {
    this.navCtrl.navigateForward('/tabs/cart');
  }
}
