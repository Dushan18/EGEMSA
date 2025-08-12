import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GuardarSolicitud, ListarSolicitudRequest, Paginado } from '../models/solicitud';
import { ReporteAnualRequest, ReporteTrazabilidadRequest, ReporteTrimestralRequest } from '../models/reporte';
@Injectable({
    providedIn:'root'
})
export class ReporteService extends BaseService{
    private url : string = environment.urlAPI+"Reportes/"
    constructor(
        private http:HttpClient
    ){
        super();
    }
    descargarReporteAnual(request:ReporteAnualRequest):Promise<any>{
        const httpOptions = {
            responseType: 'blob' as 'json'
          };
        return this.http.post(`${this.url}Reporte-Anual`,request,httpOptions).toPromise();
    }

    descargarTrimestral(request:ReporteTrimestralRequest):Promise<any>{
        const httpOptions = {
            responseType: 'blob' as 'json'
          };
        return this.http.post(`${this.url}Reporte-Trimestral`,request,httpOptions).toPromise();
    }

    descargarTrazabilidad(request:ReporteTrazabilidadRequest):Promise<any>{
        const httpOptions = {
            responseType: 'blob' as 'json'
          };
        return this.http.post(`${this.url}Reporte-Trazabilidad`,request,httpOptions).toPromise();
    }

}