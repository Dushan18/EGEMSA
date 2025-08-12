import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { RouterModule } from '@angular/router';
import { RegistrarSolicitudComponent } from './registrar-solicitud/registrar-solicitud.component';
import { BusquedaSolicitudComponent } from './busqueda-solicitud/busqueda-solicitud.component';
import { InicioComponent } from './inicio/inicio.component';
import { SharedModule } from '../shared/shared.module';
import { DialogTerminosCondicionesComponent } from './registrar-solicitud/terminos-condiciones/terminos-condiciones.component';



@NgModule({
  declarations: [
    PagesComponent,
    RegistrarSolicitudComponent,
    BusquedaSolicitudComponent,
    InicioComponent,
    HeaderComponent,
    FooterComponent,
    DialogTerminosCondicionesComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ]
})
export class PagesModule { }
