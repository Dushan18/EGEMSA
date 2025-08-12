export interface GuardarSolicitud{
    // solicitudId:number,
    personaJuridica?:PersonaJuridica,
    personaNatural?:PersonaNatural,
    correo:string,
    telefono:string,
    informacionSolicitada:string,
    formaEntregaID:number,
    tipoEntrega?:string,
    costoEntrega?:string,
    direccion:string,
    departamento?:string,
    provincia?:string,
    distritoID:number,
    ubigeo?:string,
    nombreFrai?:string,
    nombres?:string
    documentoIdentidad?:string
}

export interface PersonaNatural{
    nombres:string,
    apellidoPaterno:string,
    apellidoMaterno:string,
    nroDocumento:string,
    tipoDocumento:string,
    sexo:string
}

export interface PersonaJuridica{
    ruc:string,
    razonSocial:string
}

export interface ListarSolicitudRequest{
    codigoSolicitud?:string,
    catalogoEstadoID?:number,
    nroDocumento?:string,
    fechaInicioPresentacion?:string,
    fechaFinPresentacion?:string,
    fechaInicioAtencion?:string,
    fechaFinAtencion?:string
}
export interface Paginado{
    numeroPagina:number,
    sizePagina:number,
}
export interface EnviarCorreoVerificacion{
  correo:string
}
export interface VerificarCorreo{
  Identificador:string,
  Code:string,
  Email:string
}
export interface ValidarVerificacionCorreo{
  VerificacionCorreoID:number
}
