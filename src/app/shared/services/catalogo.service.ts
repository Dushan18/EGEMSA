import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn:'root'
})

export class CatalogoService extends BaseService{
    private url : string = environment.urlAPI+"CatalogoFormaEntrega/"
    private url_Estado : string = environment.urlAPI+"Estado/"
    constructor(
        private http:HttpClient
    ){
        super();
    }

    listaFormaEntrega():Promise<any>{
        console.log("request enviado")
        return this.http.get(`${this.url}Lista`).toPromise();
    }

    listaEstadosSolicitud():Promise<any>{
        return this.http.get(this.url_Estado).toPromise();
    }

    
}