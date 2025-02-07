import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Producto } from 'src/app/models/entities/Entidades';
import { CartItem, CartService } from 'src/app/views/shared/services/cart.service';
import { ProductosService } from 'src/app/views/shared/services/productos.service';
import { EventService } from 'src/app/views/shared/services/event.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss']
})
export class CartPage implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  totalAmount: number = 0;
  private subscriptions: Subscription[] = [];

  constructor(
    private cartService: CartService,
    private productosService: ProductosService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private navCtrl: NavController,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.cartService.getItems().subscribe(items => this.cartItems = items),
      this.cartService.getTotalAmount().subscribe(total => this.totalAmount = total)
    );
  }

  getProductImage(producto: Producto): string {
    return producto.idAdjuntosNavigation?.ruta
      ? `${environment.baseUrl}/${producto.idAdjuntosNavigation.ruta}`
      : 'assets/default-product.png';
  }

  async onIncrease(item: CartItem) {
    if (item.producto.stock && item.cantidad < item.producto.stock) {
      const stockCommand = {
        idProductos: item.producto.idProductos,
        nombreProdcuto: item.producto.nombreProdcuto,
        precio: item.producto.precio,
        stock: item.producto.stock - 1,
        idAdjuntos: item.producto.idAdjuntos,
        esActivo: item.producto.esActivo
      };

      try {
        await this.productosService.actualizarStock(stockCommand).toPromise();
        this.cartService.updateQuantity(item.producto.idProductos!, item.cantidad + 1);
        item.producto.stock = stockCommand.stock;
      } catch (error) {
        await this.showAlert('Error', 'No se pudo actualizar el stock');
        console.error('Error al actualizar stock:', error);
      }
    } else {
      await this.showAlert('Stock insuficiente', 'No hay suficiente stock disponible');
    }
  }

  async onDecrease(item: CartItem) {
    if (item.cantidad > 1) {
      const stockCommand = {
        idProductos: item.producto.idProductos,
        nombreProdcuto: item.producto.nombreProdcuto,
        precio: item.producto.precio,
        stock: (item.producto.stock || 0) + 1,
        idAdjuntos: item.producto.idAdjuntos,
        esActivo: item.producto.esActivo
      };

      try {
        await this.productosService.actualizarStock(stockCommand).toPromise();
        this.cartService.updateQuantity(item.producto.idProductos!, item.cantidad - 1);
        item.producto.stock = stockCommand.stock;
      } catch (error) {
        await this.showAlert('Error', 'No se pudo actualizar el stock');
        console.error('Error al actualizar stock:', error);
      }
    } else {
      this.removeFromCart(item);
    }
  }

  async removeFromCart(item: CartItem) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar producto',
      message: '¿Desea eliminar este producto del carrito?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: async () => {
            const stockCommand = {
              idProductos: item.producto.idProductos,
              nombreProdcuto: item.producto.nombreProdcuto,
              precio: item.producto.precio,
              stock: (item.producto.stock || 0) + item.cantidad,
              idAdjuntos: item.producto.idAdjuntos,
              esActivo: item.producto.esActivo
            };

            try {
              await this.productosService.actualizarStock(stockCommand).toPromise();
              this.cartService.removeItem(item.producto.idProductos!);
              this.eventService.triggerProductsReload(); // Agregamos esta línea
            } catch (error) {
              await this.showAlert('Error', 'No se pudo restaurar el stock');
              console.error('Error al restaurar stock:', error);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async checkout() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar pedido',
      message: `Total a pagar: $${this.totalAmount.toFixed(2)}`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: async () => {
            await this.procesarPedido();
          }
        }
      ]
    });
    await alert.present();
  }

  private async procesarPedido() {
    const loading = await this.loadingCtrl.create({
      message: 'Procesando pedido...'
    });
    await loading.present();

    try {
      const idUsuario = 1; // Deberías obtener esto de tu servicio de autenticación
      await this.cartService.createPedido(idUsuario).toPromise();
      this.cartService.clearCart();
      await loading.dismiss();
      await this.showAlert('¡Éxito!', 'Su pedido ha sido procesado correctamente');
      await this.router.navigate(['/tabs/tab3']);
    } catch (error) {
      await loading.dismiss();
      await this.showAlert('Error', 'Hubo un error al procesar su pedido. Por favor, intente nuevamente.');
      console.error('Error al crear el pedido:', error);
    }
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
