import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn:'root'
})

export class UbicacionService extends BaseService{
    private urlDep : string = environment.urlAPI+"Departamento"
    private urlDis : string = environment.urlAPI+"Distrito/"
    private urlPro : string = environment.urlAPI+"Provincia/"
    constructor(
        private http:HttpClient
    ){
        super();
    }

    obtenerDepartamentos():Promise<any>{
        console.log("request enviado")
        return this.http.get(`${this.urlDep}`).toPromise();
    }

    obtenerProvincia(idProvincia:number):Promise<any>{
        console.log("request enviado")
        return this.http.get(`${this.urlPro}`+idProvincia).toPromise();
    }

    obtenerDistrito(idDistrito:number):Promise<any>{

        const params = new HttpParams().set('id',idDistrito)
        console.log("request enviado")
        return this.http.get(`${this.urlDis}`+idDistrito).toPromise();
    }

    
}