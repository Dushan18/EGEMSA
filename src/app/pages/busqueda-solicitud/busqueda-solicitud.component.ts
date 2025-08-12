import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IApiResponse } from 'src/app/shared/models/response';
import { BitacoraService } from 'src/app/shared/services/bitacora.service';
import { SolicitudService } from 'src/app/shared/services/solicitud.service';
import { __messageSnackBar } from 'src/app/utils/helpers';

@Component({
  selector: 'app-busqueda-solicitud',
  templateUrl: './busqueda-solicitud.component.html',
  styleUrls: ['./busqueda-solicitud.component.css']
})
export class BusquedaSolicitudComponent implements OnInit {

  formGroup : FormGroup
  solicitudesArr:any[];

  constructor(
    private _solicitudService :SolicitudService,
    private _bitacoraService :BitacoraService,
    private _matSnackBar: MatSnackBar,
  ) {
    this.formGroup = new FormGroup({
      numeroSolicitud : new FormControl(null,[Validators.required]),
      claveSolicitud : new FormControl(null,[Validators.required])
    })
  }

  ngOnInit(): void {
  }

  async busquedaSolicitud(){
    debugger
    const numSolicitud = this.formGroup.get('numeroSolicitud')?.value
    const claveSolicitud = this.formGroup.get('claveSolicitud')?.value

    try {
      const {
        status,
        value,
        msg
      }:IApiResponse = await this._bitacoraService.listarByNumSolicitud(numSolicitud,claveSolicitud)
      if (msg=="error") {
        //mostrar mensaje error
        return __messageSnackBar(this._matSnackBar,"El usuario y/o contraseña no corresponden.")
      }
      if (status==true) {
        if(value.length == 0){
          this.solicitudesArr=value;
          return __messageSnackBar(this._matSnackBar,"El código de solicitud y/o clave no corresponden.")
        }else{
        //mostrar la data
        this.solicitudesArr=value;
        //mostrar mensaje de exito
        return __messageSnackBar(this._matSnackBar,"Datos obtenidos correctamente.")
       }
      }
    } catch (error) {
      //mostrar error controlado
    }

  }

}
