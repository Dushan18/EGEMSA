export interface IApiResponse {
    status  : boolean;
    value: any;
    msg   : any;
    codigoSolicitud?:any,
    file?:any,
    nombre?:any,
    tipoMIME?:any
}