import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CatalogoFormaEntrega, CatalogoFormaEntregaLista } from 'src/app/shared/models/catalogo';
import { IApiResponse } from 'src/app/shared/models/response';
import { CatalogoService } from 'src/app/shared/services/catalogo.service';
import { PersonaService } from 'src/app/shared/services/persona.service';
import { ResponsableService } from 'src/app/shared/services/responsable.service';
import { UbicacionService } from 'src/app/shared/services/ubicacion.service';
import { __messageSnackBar } from 'src/app/utils/helpers';
import { DialogTerminosCondicionesComponent } from './terminos-condiciones/terminos-condiciones.component';
import { EnviarCorreoVerificacion, GuardarSolicitud, ValidarVerificacionCorreo } from 'src/app/shared/models/solicitud';
import { SolicitudService } from 'src/app/shared/services/solicitud.service';
import { ModalConfirmacionComponet } from 'src/app/shared/components/modalConfirmacion/modal-confirmacion';


@Component({
  selector: 'app-registrar-solicitud',
  templateUrl: './registrar-solicitud.component.html',
  styleUrls: ['./registrar-solicitud.component.css']
})
export class RegistrarSolicitudComponent implements OnInit {

  formGroup: FormGroup;
  idResponsable: string = "1"
  seccionDatosPersNatu: boolean = true
  formasEntrega: CatalogoFormaEntregaLista;
  termCondionesLeido: boolean = false;
  CatalogoFormaEntrega: any[];
  listaDepartamentos: any[];
  listaProvincia: any[];
  listaDistrito: any[];
  listaTiposEntrega: any[];
  mostrarMensajeCosto: boolean = false;
  buttonDisabled: boolean = false;
  buttonDisabledEnviarCorreo: boolean = false;
  loadingEnvioCorreo: boolean = false;
  VerificacionCorreoID:number = 0;
  CorreoValidado: boolean = false;
  cantidadCaracteresNumDocu:number=0;
  documentNumberLengthMax = 0;
  documentNumberLengthMin = 0;
  captchaOk = false;

  constructor(
    private _responsableService: ResponsableService,
    private _personaService: PersonaService,
    private _solicitud: SolicitudService,
    private _catalogo: CatalogoService,
    private _ubicacion: UbicacionService,
    private _matSnackBar: MatSnackBar,
    public _dialog: MatDialog,
  ) {
    this.formGroup = new FormGroup({
      //SECCION PERSONA NATURAL - 1
      nombreResponsable: new FormControl({ value: "", disabled: true }, Validators.required),
      //TIPO PERSONA - 2
      tipoPersona: new FormControl({ value: "1", disabled: false }, Validators.required),
      // tipoPersona: new FormControl(1,[Validators.required]),
      //SECCION PERSONA NATURAL - 3
      tipoDocumento: new FormControl(null, [Validators.required]),
      nroDocumento: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.minLength(this.documentNumberLengthMin),Validators.maxLength(this.documentNumberLengthMax)]),
      apellidoPaterno: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      apellidoMaterno: new FormControl(null, [Validators.required]),
      nombres: new FormControl(null, [Validators.required]),
      sexo :  new FormControl({ value: "M", disabled: false }, Validators.required),
      //SECCION PERSONA JURIDICA - 3
      numeroRuc: new FormControl(null, [Validators.required]),
      razonSocial: new FormControl(null, [Validators.required]),
      //SECCION DATOS CONTACTO - 4
      direccion: new FormControl(null, [Validators.required]),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      departamento: new FormControl(null, [Validators.required]),
      provincia: new FormControl(null, [Validators.required]),
      distrito: new FormControl(null, [Validators.required]),
      celular: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      formaEntregaID: new FormControl(null, [Validators.required]),
      informacionSolicitada: new FormControl(null, [Validators.required]),
      declaracionJurada: new FormControl(null, [Validators.required]),
    })

    this.formGroup.get('tipoDocumento')?.valueChanges.subscribe((documentType) => {
      this.setDocumentNumberLength(documentType);
      this.resetDocumentValidators();
    });
  }

  setDocumentNumberLength(documentType: string) {
    if (documentType == 'DNI') {
      this.documentNumberLengthMin = 8;
      this.documentNumberLengthMax = 8;
    } else if (documentType == 'CE') {
      this.documentNumberLengthMin = 9;
      this.documentNumberLengthMax = 12;
    } else if (documentType == 'OTRO') {
      this.documentNumberLengthMin = 8;
      this.documentNumberLengthMax = 20;
    } else {
      this.documentNumberLengthMin = 0;
      this.documentNumberLengthMax = 0;
    }
  }

  resetDocumentValidators() {
    this.formGroup
      .get('nroDocumento')
      ?.setValidators([
        Validators.required,
        Validators.minLength(this.documentNumberLengthMin),
        Validators.maxLength(this.documentNumberLengthMax),
      ]);
    this.formGroup
      .get('nroDocumento')
      ?.updateValueAndValidity({ emitEvent: false });
  }

  async ngOnInit() {
    this.obtieneDatosResponsable();
    this.buscarDepartamento();
    this.listaFormaEntrega();
    this.formGroup.get('numeroRuc')?.disable();
    this.formGroup.get('razonSocial')?.disable();
    this.formGroup.get('tipoPersona')?.setValue('1');
    if(this.formGroup.get('tipoPersona')?.value){
      this.changeTipoPersona(this.formGroup.get('tipoPersona')?.value)
    }
    this.limpiarCorreo();
  }

  async descargarSolicitudPDF() {
    // debugger
    const pdf = await this._solicitud.descargarFormulario(1)
    // console.log("pdf", pdf)
    const url = window.URL.createObjectURL(pdf);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nombre_del_archivo.pdf'; // Reemplaza con el nombre deseado del archivo
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }

  async obtieneDatosResponsable() {
    try {
      const { status, value, msg }: IApiResponse = await this._responsableService.obtenerDatosResponsable(this.idResponsable)
      if (status == true) {
        const noombreResp = value[0].responsable.nombres
        const apellidoPResp = value[0].responsable.apellidoPaterno
        const apellidoMResp = value[0].responsable.apellidoMaterno
        const nombreCompleto = apellidoPResp + " " + apellidoMResp + " " + noombreResp;
        this.formGroup.get('nombreResponsable')?.setValue(nombreCompleto)
        return __messageSnackBar(this._matSnackBar, "Se obtuvo Datos del FRAI");
      }
      const nombreResponsable = 'asd'
      if (status == null) {
      }
      this.formGroup.get('nombreResponsable')?.setValue(nombreResponsable)
    } catch (error) {

    }
  }

  async validateAndSubmit() {
    // this.formGroup.disable();

    // const obj = this.formGroup.value;
    // console.log(obj)
    // await this.obtieneDatosResponsable();
  }

  async listaFormaEntrega() {
    try {
      const { status, value, msg }: IApiResponse = await this._catalogo.listaFormaEntrega();
      if (status == true) {
        this.listaTiposEntrega = value;
        __messageSnackBar(this._matSnackBar, "Se obtuvo Formas de Entrega")
        // console.log("value", value)
        this.CatalogoFormaEntrega = value
      }
    } catch (error) {

    }
  }

  changeTipoPersona(tipoPersona: string) {

    (tipoPersona == "1") ? this.seccionDatosPersNatu = true : this.seccionDatosPersNatu = false;
    this.limpiarCamposxTipoPersona(tipoPersona)
  }

  async buscarPersonaNatu() {
    var valido = this.formGroup.get('nroDocumento')?.valid;
    if(valido){
      try {
        const numDocu = this.formGroup.get('nroDocumento')?.value
        const { status, value, msg }: IApiResponse = await this._personaService.obtenerPersonaReniec(numDocu.toString());
        if (status == true) {
          const apellidoPNatu = value.apellidoPaterno
          const apellidoMNatu = value.apellidoMaterno
          const nombresNatu = value.nombres
          const nroDocumento = value.numeroDocumento
          if (apellidoPNatu == "" || apellidoMNatu == "" || nombresNatu == "") {
            __messageSnackBar(this._matSnackBar, "Verifique el número de documento")
          }
          else {
            this.formGroup.get('apellidoPaterno')?.disable();
            this.formGroup.get('apellidoPaterno')?.setValue(apellidoPNatu);
            this.formGroup.get('apellidoMaterno')?.disable();
            this.formGroup.get('apellidoMaterno')?.setValue(apellidoMNatu)
            this.formGroup.get('nombres')?.disable();
            this.formGroup.get('nombres')?.setValue(nombresNatu)
            this.formGroup.get('nroDocumento')?.setValue(nroDocumento)
            __messageSnackBar(this._matSnackBar, "Datos de persona obtenidos")
          }
        }
      }
      catch (error) {
        return __messageSnackBar(this._matSnackBar, error);
      }
    }else{
      __messageSnackBar(this._matSnackBar, "Debe cumplir con las validaciones del Nro. de documento")
    }
  }

  limpiarCampos() {
    this.formGroup.get('apellidoPaterno')?.enable();
    this.formGroup.get('apellidoPaterno')?.setValue(null);
    this.formGroup.get('apellidoMaterno')?.enable();
    this.formGroup.get('apellidoMaterno')?.setValue(null)
    this.formGroup.get('nombres')?.enable();
    this.formGroup.get('nombres')?.setValue(null)
    this.formGroup.get('nroDocumento')?.setValue(null)
    this.formGroup.get('nroDocumento')?.enable()
    if (this.formGroup.get('tipoDocumento')?.value=="DNI") {
      // this.cantidadCaracteresNumDocu=8;
      this.documentNumberLengthMax = 8
    }
    if (this.formGroup.get('tipoDocumento')?.value=="CE") {
      // this.cantidadCaracteresNumDocu=12;
      this.documentNumberLengthMax = 12
    }
    if (this.formGroup.get('tipoDocumento')?.value=="OTRO") {
      // this.cantidadCaracteresNumDocu=15;
      this.documentNumberLengthMax = 20;
    }

  }
  limpiarCamposxTipoPersona(tipoPersona: string) {
    this.formGroup.get('apellidoPaterno')?.enable();
    this.formGroup.get('apellidoPaterno')?.setValue(null);
    this.formGroup.get('apellidoMaterno')?.enable();
    this.formGroup.get('apellidoMaterno')?.setValue(null)
    this.formGroup.get('nombres')?.enable();
    this.formGroup.get('nombres')?.setValue(null)
    this.formGroup.get('nroDocumento')?.setValue(null)
    this.formGroup.get('numeroRuc')?.enable();
    this.formGroup.get('numeroRuc')?.setValue(null)
    this.formGroup.get('razonSocial')?.enable();
    this.formGroup.get('razonSocial')?.setValue(null);
    if (tipoPersona == "1") {
      this.formGroup.get('numeroRuc')?.disable();
      this.formGroup.get('razonSocial')?.disable();
      this.formGroup.get('tipoDocumento')?.enable();
    }
    if (tipoPersona == "2") {
      this.formGroup.get('tipoDocumento')?.disable();
      this.formGroup.get('apellidoPaterno')?.disable();
      this.formGroup.get('apellidoMaterno')?.disable();
      this.formGroup.get('nombres')?.disable();
      this.formGroup.get('nroDocumento')?.disable();
    }

    this.formGroup.get('direccion')?.setValue(null);
    this.formGroup.get('departamento')?.setValue(null);
    this.formGroup.get('provincia')?.setValue(null);
    this.formGroup.get('distrito')?.setValue(null);
    this.formGroup.get('celular')?.setValue(null);
    this.formGroup.get('formaEntregaID')?.setValue(null);
    this.formGroup.get('informacionSolicitada')?.setValue(null);
    this.formGroup.get('declaracionJurada')?.setValue(null);

    this.obtieneDatosResponsable();
    this.buscarDepartamento();
    this.listaFormaEntrega();
    this.limpiarCorreo();
  }

  cambioTipoEntrega() {
    const idTipoEntrega = this.formGroup.get('formaEntregaID')?.value;
    const generaCosto = this.listaTiposEntrega.find(item => item.formaEntregaID == idTipoEntrega)
    if (generaCosto.generaCosto == 1) {
      this.mostrarMensajeCosto = true;
    } else {
      this.mostrarMensajeCosto = false;
    }
  }

  limpiarCamposDep() {
    // this.formGroup.get('provincia')?.enable();
    this.formGroup.get('provincia')?.setValue(null);
    //this.formGroup.get('apellidoPaterno')?.enable();
    this.formGroup.get('distrito')?.setValue(null);
  }

  async buscarPersonaJuridica() {

    var valido = this.formGroup.get('numeroRuc')?.valid;
    if(valido){
      try {
        const numRuc = this.formGroup.get('numeroRuc')?.value
        const { status, value, msg }: IApiResponse = await this._personaService.obtenerPersonaSunat(numRuc);
        if (status == true) {
          // this.formGroup.get('numeroRuc')?.disable();
          // this.formGroup.get('numeroRuc')?.setValue(value)
          if (value.razonSocial == null || value.razonSocial=="") {
            __messageSnackBar(this._matSnackBar, "Verifique el número de RUC")
          } else {
            this.formGroup.get('razonSocial')?.disable();
            this.formGroup.get('razonSocial')?.setValue(value.razonSocial);
            __messageSnackBar(this._matSnackBar, "Datos de persona jurídica obtenidos")
          }
          // console.log("value", value)
        }
      }
      catch (error) {
        return __messageSnackBar(this._matSnackBar, error);
      }
    }else{
      __messageSnackBar(this._matSnackBar, "Debe cumplir con las validaciones del RUC")
    }
  }

  async buscarDepartamento() {
    try {
      const { status, value, msg }: IApiResponse = await this._ubicacion.obtenerDepartamentos();
      if (status == true) {
        __messageSnackBar(this._matSnackBar, "Se obtuvo Lista Departamentos")
        this.listaDepartamentos = value;
        // console.log("value", value)
      }
    }
    catch (error) {
      return __messageSnackBar(this._matSnackBar, error);
    }
  }

  async buscarProvincia() {
    this.formGroup.get('provincia')?.setValue(null);
    this.formGroup.get('distrito')?.setValue(null);
    // console.log(this.formGroup.get('departamento')?.value, "asd")
    const idDep = this.formGroup.get('departamento')?.value;
    //console.log("busca prov.",idProvincia)
    try {
      const { status, value, msg }: IApiResponse = await this._ubicacion.obtenerProvincia(idDep);
      if (status == true) {
        this.listaProvincia = value
        __messageSnackBar(this._matSnackBar, "Data Obtenida")
        // console.log("value", value)
      }
    }
    catch (error) {
      return __messageSnackBar(this._matSnackBar, error);
    }
  }

  async buscarDistrito() {
    this.formGroup.get('distrito')?.setValue(null);
    // console.log(this.formGroup.get('provincia')?.value, "asd2")
    const idProv = this.formGroup.get('provincia')?.value;

    try {
      const { status, value, msg }: IApiResponse = await this._ubicacion.obtenerDistrito(idProv);
      if (status == true) {
        this.listaDistrito = value
        __messageSnackBar(this._matSnackBar, "Data Obtenida")
        // console.log("value", value)
      }
    }
    catch (error) {
      return __messageSnackBar(this._matSnackBar, error);
    }
  }

  openDialogTermyCond() {
    //this.termCondionesLeido = true;
    const dialogRef = this._dialog.open(DialogTerminosCondicionesComponent);

  }

  async validarEnvio() {
    this.buttonDisabled = true
    var test = this.formGroup;
    if (this.formGroup.valid) {

      if(!this.CorreoValidado){
        __messageSnackBar(this._matSnackBar, "Debe validar su correo electrónico")
        this.markFormGroupTouched(this.formGroup);
        this.buttonDisabled = false;
        return;
      }

      var datosUbigeo = (this.listaDepartamentos.find((item)=>item.departamentoID==this.formGroup.get('departamento')?.value)).nombreDepartamento
      datosUbigeo =datosUbigeo+"/"+ (this.listaProvincia.find((item)=>item.provinciaID==this.formGroup.get('provincia')?.value)).nombreProvincia
      datosUbigeo =datosUbigeo+"/"+ (this.listaDistrito.find((item)=>item.distritoID==this.formGroup.get('distrito')?.value)).nombreDistrito
      // console.log("datosUbigeo",datosUbigeo)
      var tipoEntregaString=(this.listaTiposEntrega.find((item)=>item.formaEntregaID==this.formGroup.get('formaEntregaID')?.value)).descripcion
      // console.log("tipoEntregaString",tipoEntregaString);
      const solicitudGuardarPersNatuRequest: GuardarSolicitud = {
        correo: this.formGroup.get('correo')?.value,
        telefono: this.formGroup.get('celular')?.value,
        informacionSolicitada: this.formGroup.get('informacionSolicitada')?.value,
        // departamento:this.formGroup.get('departamento')?.value,
        direccion: this.formGroup.get('direccion')?.value,
        distritoID: +this.formGroup.get('distrito')?.value,
        formaEntregaID: +this.formGroup.get('formaEntregaID')?.value,
        nombreFrai:this.formGroup.get('nombreResponsable')?.value,
        costoEntrega:(this.mostrarMensajeCosto)?'(*) Para efectos de envío de la información a través del medio seleccionado, deberá realizar un pago, el mismo que será informado en los próximos días, a través de un correo, a la cuenta indicada en la presente solicitud':'',
        ubigeo:datosUbigeo,
        tipoEntrega:tipoEntregaString

        // provincia:this.formGroup.get('provincia')?.value,
        // personaJuridica:null,
        // personaNatural:null

      };
      if (this.formGroup.get('tipoPersona')?.value == "1") {//PERSONA NATURAL
        solicitudGuardarPersNatuRequest.personaNatural = {
          tipoDocumento: this.formGroup.get('tipoDocumento')?.value,
          nroDocumento: this.formGroup.get('nroDocumento')?.value,
          nombres: this.formGroup.get('nombres')?.value,
          apellidoPaterno: this.formGroup.get('apellidoPaterno')?.value,
          apellidoMaterno: this.formGroup.get('apellidoMaterno')?.value,
          sexo: this.formGroup.get('sexo')?.value
        }
        solicitudGuardarPersNatuRequest.nombres=(this.formGroup.get('nombres')?.value+' '+this.formGroup.get('apellidoPaterno')?.value+' '+this.formGroup.get('apellidoMaterno')?.value)
        solicitudGuardarPersNatuRequest.documentoIdentidad=this.formGroup.get('tipoDocumento')?.value+'/'+this.formGroup.get('nroDocumento')?.value
      } else { //PERSONA JURIDICA
        solicitudGuardarPersNatuRequest.personaJuridica = {
          ruc: this.formGroup.get('numeroRuc')?.value,
          razonSocial: this.formGroup.get('razonSocial')?.value
        }
        solicitudGuardarPersNatuRequest.nombres=this.formGroup.get('razonSocial')?.value
        solicitudGuardarPersNatuRequest.documentoIdentidad = this.formGroup.get('numeroRuc')?.value
      }
      const response: IApiResponse = await this._solicitud.registrarSolicitud(solicitudGuardarPersNatuRequest)
      if (response.status == true) {
        //value.codigo retornara un valor, por ahora sera 1
        this.modalOpen(response.codigoSolicitud, solicitudGuardarPersNatuRequest.correo,1,response);
        this.buttonDisabled = false
      }
    } else {
      // console.log("false")
      __messageSnackBar(this._matSnackBar, "Debe llenar los campos obligatorios")
      this.markFormGroupTouched(this.formGroup);
      this.buttonDisabled = false;
    }
  }

  async enviarCorreoVerificacion() {
    this.loadingEnvioCorreo = true;
    this.buttonDisabledEnviarCorreo = false
    var errores = this.formGroup.get('correo')?.errors;
    if (!this.formGroup.get('correo')?.errors) {

      const enviarCorreoVerificacionRequest: EnviarCorreoVerificacion = {
        correo: this.formGroup.get('correo')?.value
      };

      const response: IApiResponse = await this._solicitud.enviarCorreoVerificacion(enviarCorreoVerificacionRequest)
      if (response.status == true) {
        if(response.value > 0){
          this.VerificacionCorreoID = response.value;
          __messageSnackBar(this._matSnackBar, "El correo de validación ha sido enviado correctamente. Por favor revise su bandeja de correo para terminar con la validación.")
          this.buttonDisabledEnviarCorreo = true;
          this.loadingEnvioCorreo = false;
          this.formGroup.get('correo')?.disable();
        }else{
          __messageSnackBar(this._matSnackBar, "El correo de validación no pudo ser enviado correctamente. Por favor revise que el correo este correcto e intente nuevamente.")
          this.buttonDisabledEnviarCorreo = false;
          this.loadingEnvioCorreo = false;
        }
      }
    } else {
      __messageSnackBar(this._matSnackBar, "El correo tiene un formato incorrecto.")
      this.markFormGroupTouched(this.formGroup);
      this.buttonDisabledEnviarCorreo = false;
      this.loadingEnvioCorreo = false;
    }
  }

  async validarVerificacionCorreo() {

    this.CorreoValidado = false

    if (!this.formGroup.get('correo')?.errors) {

      const validarVerificacionCorreoRequest: ValidarVerificacionCorreo = {
        VerificacionCorreoID: this.VerificacionCorreoID
      };

      const response: IApiResponse = await this._solicitud.validarVerificacionCorreo(validarVerificacionCorreoRequest)
      if (response.status == true) {
        if(response.value == true){
          __messageSnackBar(this._matSnackBar, "Puede continuar con el registro de la solicitud.")
          this.CorreoValidado = true
        }else{
          __messageSnackBar(this._matSnackBar, "Correo no verificado. Por favor ingrese a su bandeja de correo electrónico para verificar su cuenta y terminar con la validación.")
          this.CorreoValidado = false
        }
      }
    } else {
      __messageSnackBar(this._matSnackBar, "El correo tiene un formato incorrecto.")
      this.markFormGroupTouched(this.formGroup);
      this.CorreoValidado = false;
    }
  }

  limpiarCorreo(){
    this.formGroup.get('correo')?.enable();
    this.formGroup.get('correo')?.setValue(null);
    this.CorreoValidado = false;
    this.buttonDisabledEnviarCorreo = false;
  }

  modalOpen(codSolicitud: string, correo: string,codigo:number,response:any) {
    const dialogRef = this._dialog.open(ModalConfirmacionComponet, { disableClose: true, data: { codSolicitud: codSolicitud, correo: correo, codigo:codigo,data:response } });
    dialogRef.afterClosed().subscribe(result => {
      var tipoPersona = "1";
      this.limpiarCamposxTipoPersona(tipoPersona);
      this.mostrarMensajeCosto=false;
    })
  }
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
  cancelarRegistro(){

  }

  onSubmit() {
    if (!this.captchaOk) {
      __messageSnackBar(this._matSnackBar, "Valide el CAPTCHA antes de continuar.");
      return;
    }
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }
  }

}
