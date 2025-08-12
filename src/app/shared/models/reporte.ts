export interface ReporteAnualRequest {
    anio: string,
    formato1: Formato1,
    formato5?:Formato5[],
    formato7?: Formato7,
    formato8?: Formato8,
    formato9?: Formato9,
    formato10?: Formato10
}

export interface ReporteTrimestralRequest {
    anio: string,
    periodo: string,
    formato1: Formato1RT,
    formato3:Formato3RT[],
    formato5B?: Formato5BRT[],
    formato6: Formato6RT
}
export interface ReporteTrazabilidadRequest{
    id:0,
    codSolicitud:string
}
export interface Formato1RT {

    entidad: string,
    dependencia: string,
    nombreFrai: string,
    fechaDesignoFraiNumResolucion: string
}
export interface Formato3RT {
    solicitante: string,
    fechaSolicitud: string,
    informacion: string,
    motivo: string
}
export interface Formato5BRT {

    tipoInformacionReqNoAtendida: string,
    motivosNoAtencion: string,
}
export interface Formato6RT {

    respuestaItemA: string,
    respuestaItemB: string,
    respuestaItemC: string
}

export interface Formato1 {
    entidad: String,
    nombreSecretarioG: string,
    designoFraiSi?: string,
    designoFraiNo?: string,
    designoFrai: string,
    designoPaginaFraiSi?: string,
    designoPaginaFraiNo?: string,
    designoPaginaFrai: string,
    nombreFrai: string,
    cargoFrai: string,
    correoFrai: string,
    telefonoFrai: string,
    fechaDesignoFrai: string,
    fechaDesignoFraiDPeruanoSi?: string,
    fechaDesignoFraiDPeruanoNo?: string,
    fechaDesignoFraiDPeruano: string,
}
export interface Formato5{
    numero: string,
    nombre: string,
    sexoM: string,
    sexoF: string,
    personaJuridica: string,
    informacionSolicitada: string,
    fechaPresentacion: string,
    fechaEntregaraInfo: string
}

export interface Formato7 {
    itemA: string,
    itemB: string,
    itemC: string,
    itemD: string,
    itemE: string,
    itemF: string,
    itemF1: string,
    itemTotal: string,
}

export interface Formato8 {
    itemA: string,
    itemB: string,
    itemC: string,
    itemD: string,
    itemE: string,
    itemE1: string,
    itemE2: string,
    itemF: string,
    itemG: string,
    itemH: string,
    itemI: string,
    itemJ: string,
    itemK: string,
    itemK1: string,
    itemL: string,
    itemM: string,
    itemN: string,
    itemN1: string,
}

export interface Formato9 {
    itemA: string,
    itemB: string,
    itemC: string,
    itemD: string,
    itemE: string,
    itemF: string,
    itemG: string,
    itemH: string,
    itemI: string,
    itemJ: string,
    itemK: string,
    itemL: string,
    itemL1: string
}

export interface Formato10 {
    itemASi: string,
    itemANo: string,
    itemASiCantidad: string,
    itemBSi: string,
    itemBNo: string,
    itemBSiCantidad: string,
    itemC: string,
    itemC1: string,
    itemC2: string,
    itemC3: string,
    itemC4: string,
    itemCCantidadInstaurados: string,
    itemD1: string,
    itemD2: string,
    itemD3: string,
    itemE1: string,
    itemE2: string,
    itemE3: string,
    itemE4: string,
    itemECantidad: string
}