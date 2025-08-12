import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GuardarSolicitud, ListarSolicitudRequest, Paginado } from '../models/solicitud';
import { DerivadoSolicitudGuardar, GuardarAcopioIndividual, GuardarRespuestaIndividual } from '../models/Derivado';
@Injectable({
    providedIn: 'root'
})
export class DerivadoService extends BaseService {
    private url: string = environment.urlAPI + "Derivado/"
    constructor(
        private http: HttpClient
    ) {
        super();
    }

    obtenerDerivacionesxSoli(idSolicitud: number): Promise<any> {
        const bodyRequest = {
            id: idSolicitud
        }
        return this.http.post(`${this.url}ListaPorSolicitud`, bodyRequest).toPromise();
    }

    guardarDerivacion(request: DerivadoSolicitudGuardar, file?: any): Promise<any>  {
        let formData = new FormData();
        formData.set("SolicitudID", request.SolicitudID.toString());
        formData.set("ResponsableID", request.ResponsableID.toString());
        formData.set("Comentario", request.Comentario?.toString() || "");
        (file) ? formData.set("Documento", file) : null;
        return this.http.post(`${this.url}Guardar`, formData).toPromise();

    }

    guardarRespuestaIndividual(request:GuardarRespuestaIndividual,file?:any):Promise<any>{
        let formData = new FormData();
        formData.set("SolicitudID", request.SolicitudID.toString());
        if(request.DerivadoID){
            formData.set("DerivadoID", request.DerivadoID?.toString());
        }
        if (request.Comentario) {
            formData.set("Comentario", request.Comentario?.toString());
        }
        formData.set("FechaHoraAccion",request.FechaHoraAccion.toString());
        if (request.Respuesta) {
            formData.set("Respuesta",request.Respuesta.toString())
        }
        (file) ? formData.set("Documento", file) : null;
        return this.http.post(`${this.url}GuardarRespuestaIndividual`, formData).toPromise();
    }

    guardarAcopioIndividual(request:GuardarAcopioIndividual,file?:any):Promise<any>{
        let formData = new FormData();
        formData.set("SolicitudID", request.SolicitudID.toString());
        if(request.DerivadoID){
            formData.set("DerivadoID", request.DerivadoID?.toString());
        }
        if (request.Comentario) {
            formData.set("Comentario", request.Comentario?.toString());
        }
        formData.set("FechaHoraAccion",request.FechaHoraAccion.toString());
        (file) ? formData.set("Documento", file) : null;
        return this.http.post(`${this.url}GuardarAcopioIndividual`, formData).toPromise();
    }
}