export interface DerivadoSolicitudGuardar{
    // solicitudId:number,
    SolicitudID :number,
    ResponsableID :number,
    Comentario :string,
    Documento?:string,
}

export interface GuardarRespuestaIndividual{
    SolicitudID :number,
    DerivadoID?:number,
    Comentario?:string,
    FechaHoraAccion :string,
    Respuesta:number,
}

export interface GuardarAcopioIndividual{
    SolicitudID :number,
    DerivadoID?:number,
    Comentario?:string,
    FechaHoraAccion :string,
}