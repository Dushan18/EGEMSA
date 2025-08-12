import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GuardarClasificacion, GuardarConfirmacionEntrega, GuardarEntrega, GuardarPago, GuardarRevision, GuardarSigedd, GuardarVoucher } from '../models/bitacora';
@Injectable({
    providedIn: 'root'
})
export class BitacoraService extends BaseService {
    private url: string = environment.urlAPI + "Bitacora/"
    constructor(
        private http: HttpClient
    ) {
        super();
    }

    listarByCodigoSolicitud(idSolicitud:number): Promise<any> {
        const request ={
            id:idSolicitud
        }
        return this.http.post(`${this.url}ListaPorSolicitud`, request).toPromise();
    }

    listarByNumSolicitud(numSolicitud:number,claveSolicitud:string): Promise<any> {
        const request ={
            codigo:numSolicitud,
            claveSolicitud:claveSolicitud
        }
        return this.http.post(`${this.url}ListaPorCodigo`, request).toPromise();
    }



    guardarRevision(request: GuardarRevision, file?: any): Promise<any> {
        let formData = new FormData();
        formData.set("SolicitudID", request.SolicitudID.toString())
        formData.set("Comentario", request.Comentario?.toString()||"")
        formData.set("FechaHoraAccion", request.FechaHoraAccion.toString())
        formData.set("Respuesta", request.Respuesta.toString())
        if (request.Respuesta == 1) {//PROBADO
            formData.set("Documento", file);
            formData.set("TipoInfo",request.TipoInfo?.toString()||"")
        }
        // const requestFormData = {
        //     SolicitudID: 1,
        //     Comentario: "asdasd",
        //     FechaHoraAccion: "15-10-2023 15:20",
        //     Respuesta: 1,
        //     Documento: file
        // }
        // const params = new HttpParams()
        // .set('numSolicitud',numSolicitud.toString())
        return this.http.post(`${this.url}GuardarRevision`, formData).toPromise();
    }

    guardarCodigoSiged(request: GuardarSigedd, file?: any): Promise<any> {
        let formData = new FormData();
        formData.set("SolicitudID", request.SolicitudID.toString())
        formData.set("Comentario", request.Comentario?.toString()||"")
        formData.set("FechaHoraAccion", request.FechaHoraAccion.toString())
        formData.set("CodigoSigedd", request.CodigoSigedd.toString())
        formData.set("Documento", file)
        return this.http.post(`${this.url}GuardarSigedd`, formData).toPromise();
    }

    guardarClasificacion(request: GuardarClasificacion, file?: any): Promise<any> {
        let formData = new FormData();
        formData.set("SolicitudID", request.SolicitudID.toString())
        formData.set("Comentario", request.Comentario?.toString()||"")
        formData.set("FechaHoraAccion", request.FechaHoraAccion.toString())
        formData.set("Respuesta", request.Respuesta.toString())
        formData.set("Documento", file)
        // if (request.Respuesta == 1) {//PROBADO
        // }
        return this.http.post(`${this.url}GuardarClasificacion`, formData).toPromise();
    }

    guardarPago(request: GuardarPago, file?: any): Promise<any> {
        let formData = new FormData();
        formData.set("SolicitudID", request.SolicitudID.toString());
        formData.set("Comentario", request.Comentario?.toString()||"");
        formData.set("FechaHoraAccion", request.FechaHoraAccion.toString());
        formData.set("Costo", request.Costo.toString());
        (file)?formData.set("Documento", file):null;
        // if (request.Respuesta == 1) {//PROBADO
        // }
        return this.http.post(`${this.url}GuardarPago`, formData).toPromise();
    }

    guardarVoucher(request: GuardarVoucher, file: any): Promise<any> {
        let formData = new FormData();
        formData.set("SolicitudID", request.SolicitudID.toString());
        formData.set("Comentario", request.Comentario?.toString()||"");
        formData.set("FechaHoraAccion", request.FechaHoraAccion.toString());
        formData.set("Documento", file);
        // if (request.Respuesta == 1) {//PROBADO
        // }
        return this.http.post(`${this.url}GuardarVoucher`, formData).toPromise();
    }

    guardarEntrega(request: GuardarEntrega): Promise<any> {
        let formData = new FormData();
        formData.set("SolicitudID", request.SolicitudID.toString());
        formData.set("Comentario", request.Comentario?.toString()||"");
        formData.set("FechaHoraAccion", request.FechaHoraAccion.toString());
        return this.http.post(`${this.url}GuardarEntrega`, formData).toPromise();
    }

    guardarConfirmacionEntrega(request: GuardarConfirmacionEntrega, file: any): Promise<any> {
        let formData = new FormData();
        formData.set("SolicitudID", request.SolicitudID.toString());
        formData.set("Comentario", request.Comentario?.toString()||"");
        formData.set("FechaHoraAccion", request.FechaHoraAccion.toString());
        formData.set("Documento", file);
        return this.http.post(`${this.url}GuardarConfirmacionEntrega`, formData).toPromise();
    }

}