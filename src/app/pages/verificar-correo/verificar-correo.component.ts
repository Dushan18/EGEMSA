import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute,ParamMap  } from '@angular/router';
import { IApiResponse } from 'src/app/shared/models/response';
import { VerificarCorreo } from 'src/app/shared/models/solicitud';
import { SolicitudService } from 'src/app/shared/services/solicitud.service';
import { __messageSnackBar } from 'src/app/utils/helpers';

@Component({
  selector: 'app-verificar-correo',
  templateUrl: './verificar-correo.component.html',
  styleUrls: ['./verificar-correo.component.css']
})
export class VerificarCorreoComponent implements OnInit {

  mensaje: string;

  constructor(
    private _solicitudService :SolicitudService,
    private _matSnackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    let Identificador = this.route.snapshot.paramMap.get('Identificador');
    let Code = this.route.snapshot.paramMap.get('Code');
    let Email = this.route.snapshot.paramMap.get('Email');
    this.verificarCorreo(Identificador,Code,Email);
  }

  async verificarCorreo(Identificador:any,Code:any,Email:any){
debugger;
    try {
      // this.buttonDisabledEnviarCorreo = false
      if (Identificador != null && Code != null && Email != null) {

        const verificarCorreoRequest: VerificarCorreo = {
          Identificador : Identificador,
          Code: Code,
          Email : Email
        };

        const response: IApiResponse = await this._solicitudService.verificarCorreo(verificarCorreoRequest)
        if (response.status == true) {
          this.mensaje = response.msg;
          // __messageSnackBar(this._matSnackBar, "El correo de validación ha sido enviado correctamente. Por favor revise su bandeja de correo para terminar con la validación.")
          // this.buttonDisabledEnviarCorreo = true
        }
      } else {
        __messageSnackBar(this._matSnackBar, "Petición incorrecta")
        // this.buttonDisabledEnviarCorreo = false;
      }
    } catch (error) {
      //mostrar error controlado
    }

  }

}
