import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn:'root'
})

export class ResponsableService extends BaseService{
    private url : string = environment.urlAPI+"Responsable/"
    constructor(
        private http:HttpClient
    ){
        super();
    }

    obtenerDatosResponsable(idResponsable:String):Promise<any>{
        const params = new HttpParams().set('id',idResponsable.toString())
        console.log("request enviado")
        return this.http.get(`${this.url}porArea/`+idResponsable).toPromise();
        // return this.http.get(`${this.url}porArea`+idResponsable,{params}).toPromise();
    }
}