import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn:'root'
})

export class PersonaService extends BaseService{
    private url : string = environment.urlAPI+"Persona/"
    constructor(
        private http:HttpClient
    ){
        super();
    }

    obtenerPersonaReniec(dni:String):Promise<any>{
        const params = new HttpParams().set('dni',dni.toString())
        console.log("request enviado")
        return this.http.get(`${this.url}reniec`,{params}).toPromise();
    }

    obtenerPersonaSunat(ruc:String):Promise<any>{
        const params = new HttpParams().set('ruc',ruc.toString())
        console.log("request enviado")
        return this.http.get(`${this.url}sunat`,{params}).toPromise();
    }
}