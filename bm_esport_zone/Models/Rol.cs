﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace bm_esport_zone.Models;

public partial class Rol
{
    public int IdRol { get; set; }

    public string Descripcion { get; set; }

    public sbyte EsAdministrador { get; set; }

    public sbyte EsActivo { get; set; }

    public virtual ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
}