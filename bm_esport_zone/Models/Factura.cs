﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace bm_esport_zone.Models;

public partial class Factura
{
    public int IdFactura { get; set; }

    public int IdUsuario { get; set; }

    public int IdReservas { get; set; }

    public int IdPedidos { get; set; }

    public DateTime FechaFactura { get; set; }

    public decimal MontoTotal { get; set; }

    public virtual Pedido IdPedidosNavigation { get; set; }

    public virtual Reserva IdReservasNavigation { get; set; }

    public virtual Usuario IdUsuarioNavigation { get; set; }
}