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
    }
}
