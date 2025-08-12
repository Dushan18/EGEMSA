import { Component, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SolicitudService } from '../../services/solicitud.service';

@Component({
    selector: 'modal-confirmacion',
    templateUrl: './modal-confirmacion.html'
})
export class ModalConfirmacionComponet {
    @Input() disabledClose: boolean = false
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _solicitudService: SolicitudService
    ) {
        console.log("this.data", this.data)
    }

    async descargarSolicitud() {
        // console.log("descargar solicitud", this.data)
        // const pdf = await this._solicitudService.descargarFormulario(this.data.codigo);
        // console.log("pdf", pdf)
        // const url = window.URL.createObjectURL(pdf);
        // const a = document.createElement('a');
        // a.href = url;
        // a.download = this.data.codSolicitud+'.pdf'; // Reemplaza con el nombre deseado del archivo
        // document.body.appendChild(a);
        // a.click();
        // window.URL.revokeObjectURL(url);
        this.downloadFile(this.data.data.file,this.data.codSolicitud)
    }
    downloadFile(base64String: string, fileName: string) {
        // Decodificar la cadena base64 a un arreglo de bytes
        const byteCharacters = atob(base64String);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
      
        // Crear un Blob a partir de los bytes
        const blob = new Blob([byteArray], { type: 'application/pdf' });
      
        // Crear una URL del Blob
        const blobUrl = URL.createObjectURL(blob);
      
        // Crear un enlace HTML para la descarga
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = fileName;
      
        // Simular un clic en el enlace para iniciar la descarga
        a.click();
      
        // Liberar recursos
        URL.revokeObjectURL(blobUrl);
      }
}