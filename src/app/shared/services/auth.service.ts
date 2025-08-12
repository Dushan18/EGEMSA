import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AuthLogin } from "../models/auth";

@Injectable({
    providedIn:'root'
})

export class AuthService extends BaseService{
    private url : string = environment.urlAPI+"Auth/"
    constructor(
        private http:HttpClient
    ){
        super();
    }

    authUser(requestAuth:AuthLogin):Promise<any>{
        // const params = new HttpParams().set('dni',dni.toString())
        // console.log("request enviado")
        return this.http.post(`${this.url}login`,requestAuth,{headers:new HttpHeaders(
            {'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',}
            )}).toPromise();
    }


}
