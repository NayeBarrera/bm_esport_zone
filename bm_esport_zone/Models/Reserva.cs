﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace bm_esport_zone.Models;

public partial class Reserva
{
    public int IdReservas { get; set; }

    public int IdUsuario { get; set; }

    public int IdMaquinas { get; set; }

    public DateTime FechaReserv { get; set; }

    public decimal Total { get; set; }

    public sbyte EsActivo { get; set; }

    public virtual ICollection<Factura> Facturas { get; set; } = new List<Factura>();

    public virtual Maquina IdMaquinasNavigation { get; set; }

    public virtual Usuario IdUsuarioNavigation { get; set; }
}