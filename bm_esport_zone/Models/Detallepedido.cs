﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace bm_esport_zone.Models;

public partial class Detallepedido
{
    public int IdDetallePedido { get; set; }

    public int IdPedidos { get; set; }

    public int IdProductos { get; set; }

    public int? Cantidad { get; set; }

    public decimal? PrecioUnitario { get; set; }

    public decimal? Subtotal { get; set; }

    public virtual Pedido IdPedidosNavigation { get; set; }

    public virtual Producto IdProductosNavigation { get; set; }
}