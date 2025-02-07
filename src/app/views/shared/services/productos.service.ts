import { Injectable } from '@angular/core';
import { AxiosService } from 'src/app/infraestructure/helpers/AxiosInstance';
import { from } from "rxjs";
import { ResponseBackend } from 'src/app/models/entities/Response';
import { Producto, ProductosCommand } from 'src/app/models/entities/Entidades';
import { RutasBackend } from 'src/app/infraestructure/helpers/RutasBackend';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  constructor(
    private readonly axiosInstance: AxiosService,
  ) {}

  // Obtener productos
  getProdcutos() {
    return from(this.axiosInstance.getJsonInstance().get<ResponseBackend<Producto[]>>(RutasBackend.Producto.getproducto));
  }

  // Crear un nuevo producto
  setProductos(newProducto: ProductosCommand) {
    return from(this.axiosInstance.getJsonInstance().post<ResponseBackend<Producto[]>>(RutasBackend.Producto.getproducto, newProducto));
  }

  actualizarStock(Stock: ProductosCommand){
    return from(this.axiosInstance.getJsonInstance().post<ResponseBackend<Producto[]>>(RutasBackend.Producto.setproducto, Stock));
  }
}
