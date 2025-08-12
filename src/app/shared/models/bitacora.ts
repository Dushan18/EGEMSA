export interface GuardarRevision {
    SolicitudID: number,
    Comentario?: String,
    FechaHoraAccion: string,
    Respuesta: number,
    TipoInfo?:String,
    Documento?: string
}

export interface GuardarSigedd {
    SolicitudID: number,
    Comentario?: String,
    FechaHoraAccion: string,
    CodigoSigedd : string,
    Documento?: string
}

export interface GuardarClasificacion {
    SolicitudID: number,
    Comentario?: String,
    FechaHoraAccion: string,
    Respuesta: number,
    Documento?: string
}

export interface GuardarPago {
    SolicitudID: number,
    Comentario?: String,
    FechaHoraAccion: string,
    Costo: number,
}

export interface GuardarVoucher {
    SolicitudID: number,
    Comentario?: String,
    FechaHoraAccion: string,
}

export interface GuardarEntrega {
    SolicitudID: number,
    Comentario?: String,
    FechaHoraAccion: string,
}

export interface GuardarConfirmacionEntrega {
    SolicitudID: number,
    Comentario?: String,
    FechaHoraAccion: string,
}