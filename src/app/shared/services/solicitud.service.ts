import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EnviarCorreoVerificacion, GuardarSolicitud, ListarSolicitudRequest, Paginado, VerificarCorreo,ValidarVerificacionCorreo } from '../models/solicitud';
@Injectable({
    providedIn:'root'
})
export class SolicitudService extends BaseService{
    private url : string = environment.urlAPI+"Solicitud/"
    constructor(
        private http:HttpClient
    ){
        super();
    }

    buscarSolicitudxNumero(numSolicitud:String):Promise<any>{
        const params = new HttpParams()
        .set('numSolicitud',numSolicitud.toString())
        return this.http.get(`${this.url}ObtenerSolicitudes`,{params}).toPromise();
    }

    listarSolicitudesAllPaginado(request:Paginado,body?:ListarSolicitudRequest):Promise<any>{
        const params = new HttpParams()
        .set('NumeroPagina',request.numeroPagina)
        .set('TamanoPagina',request.sizePagina)
        if(body==undefined){
            return this.http.post(`${this.url}Listar?NumeroPagina=${request.numeroPagina}&TamanoPagina=${request.sizePagina}`,{body}).toPromise();
        }else{
            return this.http.post(`${this.url}Listar?NumeroPagina=${request.numeroPagina}&TamanoPagina=${request.sizePagina}`,body).toPromise();
        }
    }

    obtenerDetalleById(id:string):Promise<any>{
        const params = new HttpParams()
        return this.http.post(`${this.url}Detalle?id=${id}`,{}).toPromise();
    }


    registrarSolicitud(guardarSolicitudRequest:GuardarSolicitud):Promise<any>{
        return this.http.post(`${this.url}Guardar`,guardarSolicitudRequest).toPromise();
    }

    descargarFormulario(id:any):Promise<any>{
        const httpOptions = {
            responseType: 'blob' as 'json'
          };
        const params = new HttpParams()
        .set('Codigo',id);
        return this.http.post(`${this.url}descargar-formulario`,params,httpOptions).toPromise();
    }

    enviarCorreoVerificacion(enviarCorreoVerificacion:EnviarCorreoVerificacion):Promise<any>{
      return this.http.post(`${this.url}EnviarCorreoVerificacion`,enviarCorreoVerificacion).toPromise();
    }

    verificarCorreo(verificarCorreo:VerificarCorreo):Promise<any>{
      return this.http.post(`${this.url}VerificarCorreo`,verificarCorreo).toPromise();
    }

    validarVerificacionCorreo(ValidarVerificacionCorreo:ValidarVerificacionCorreo):Promise<any>{
      return this.http.post(`${this.url}ValidarVerificacionCorreo`,ValidarVerificacionCorreo).toPromise();
    }

}
