import { Horarios, Maquinas, Pedido, Persona, Producto, DeleteMaquinaCommand, Reserva, Rol, Usuario } from './../../models/entities/Entidades';
export const RutasBackend = {
    usuarios: {
        Authenticate: '/api/Usuarios/Autenticate',
        updateUser: '/usuarios/updateUser',
    },
    //de estos debes hacer de todos los endpoints
    factura: {
        getfactura: '/api/Factura/GetFactura',
        setFactura: '/api/Factura/SetFactura',
        deleteFactura:  '/api/Factura/DeleteFactura'
    },

    Horarios: {
      gethorarios: '/api/Horarios/GetHorarios',
      sethorarios: '/api/Horarios/SetHorarios',
      deletehorarios:  '/api/Horarios/DeleteHorario'
  },

    Maquinas: {
      getMaquinas: '/api/Maquinas/GetMaquinas',
      setMaquinas: '/api/Maquinas/SetMaquina',
      DeleteMaquinas:  '/api/Maquinas/DeleteMaquina'
  },

    Pedido: {
    getPedido: '/api/Pedido/GetPedido',
    setPedido: '/api/Pedido/SetPedido',
    deletePedido:  '/api/Pedido/DeletePedido'
  },

    Persona: {
    getpersona: '/api/Personas/GetPersonas',
    setpersona: '/api/Personas/SetPersonas',
    deletepersona:  '/api/Personas/EliminarPersonas/{IdPersonas}'
  },

    Producto: {
    getproducto: '/api/Productos/GetProductos',
    setproducto: '/api/Productos/SetProducto',
    deleteproducto:  '/api/Productos/DeleteProducto'
  },

   Reserva: {
    getpReserva: '/api/Reservas/GetReservas',
    setReserva: '/api/Reservas/SetReservas',
    deleteReserva:  '/api/Reservas/DeleteReservas'
  },

   Rol: {
    getpRol: '/api/Rol/GetRol',
    setRol: '/api/Rol/SetRol',
    deleteRol:  '/api/Rol/DeleteRol'
  },

   Usuario: {
    getpUsuario: '/api/Usuarios/GetUsersByFilter',
    setUsuario: '/api/Usuarios/GuardarUsuario',
    deleteUsuario:  '/api/Usuarios/DeleteUser'
  },

}
