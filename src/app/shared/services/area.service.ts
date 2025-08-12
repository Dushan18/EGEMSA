import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GuardarSolicitud, ListarSolicitudRequest, Paginado } from '../models/solicitud';
@Injectable({
    providedIn:'root'
})
export class AreaService extends BaseService{
    private url : string = environment.urlAPI+"Area/"
    constructor(
        private http:HttpClient
    ){
        super();
    }

    ObtenerAreasDerivado():Promise<any>{
        return this.http.get(`${this.url}AreasDerivado`).toPromise();
    }

    

}