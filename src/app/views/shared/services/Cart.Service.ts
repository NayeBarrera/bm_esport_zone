import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto, Pedido, Detallepedido } from '../../../models/entities/Entidades';
import { AxiosService } from '../../../infraestructure/helpers/AxiosInstance';
import { RutasBackend } from '../../../infraestructure/helpers/RutasBackend';
import { ResponseBackend } from '../../../models/entities/Response';
import { environment } from 'src/environments/environment';

export interface CartItem {
  producto: Producto;
  cantidad: number;
  subtotal: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items = new BehaviorSubject<CartItem[]>([]);
  private total = new BehaviorSubject<number>(0);

  constructor(private axiosInstance: AxiosService) {}

  getItems(): Observable<CartItem[]> {
    return this.items.asObservable();
  }

  getTotalAmount(): Observable<number> {
    return this.total.asObservable();
  }

  addToCart(producto: Producto, cantidad: number = 1): void {
    const currentItems = this.items.value;
    const existingItem = currentItems.find(item =>
      item.producto.idProductos === producto.idProductos
    );

    if (existingItem) {
      if (producto.stock && producto.stock >= existingItem.cantidad + cantidad) {
        existingItem.cantidad += cantidad;
        existingItem.subtotal = this.calculateSubtotal(existingItem);
      }
    } else {
      if (producto.stock && producto.stock >= cantidad) {
        currentItems.push({
          producto,
          cantidad,
          subtotal: producto.precio ? producto.precio * cantidad : 0
        });
      }
    }

    this.items.next(currentItems);
    this.updateTotal();
  }

  updateQuantity(productoId: number, newCantidad: number): void {
    const currentItems = this.items.value;
    const item = currentItems.find(item =>
      item.producto.idProductos === productoId
    );

    if (item && item.producto.stock && item.producto.stock >= newCantidad) {
      item.cantidad = newCantidad;
      item.subtotal = this.calculateSubtotal(item);
      this.items.next(currentItems);
      this.updateTotal();
    }
  }

  removeItem(productoId: number): void {
    const currentItems = this.items.value.filter(
      item => item.producto.idProductos !== productoId
    );
    this.items.next(currentItems);
    this.updateTotal();
  }

  private calculateSubtotal(item: CartItem): number {
    return item.producto.precio ? item.producto.precio * item.cantidad : 0;
  }

  private updateTotal(): void {
    const total = this.items.value.reduce(
      (sum, item) => sum + item.subtotal,
      0
    );
    this.total.next(total);
  }

  clearCart(): void {
    this.items.next([]);
    this.total.next(0);
  }

  createPedido(idUsuario: number): Observable<ResponseBackend<Pedido>> {
    const items = this.items.value;
    const pedido = {
      idUsuario,
      fechaPedido: new Date(),
      total: this.total.value,
      detallePedido: items.map(item => ({
        idProductos: item.producto.idProductos,
        cantidad: item.cantidad,
        precioUnitario: item.producto.precio,
        subtotal: item.subtotal
      }))
    };

    return from(this.axiosInstance.getJsonInstance()
      .post<ResponseBackend<Pedido>>(RutasBackend.Pedido.setPedido, pedido))
      .pipe(
        map(response => response.data)
      );
  }
}
