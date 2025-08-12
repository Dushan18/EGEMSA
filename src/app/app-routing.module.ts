import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarSolicitudComponent } from './pages/registrar-solicitud/registrar-solicitud.component';
import { PagesComponent } from './pages/pages.component';
import { BusquedaSolicitudComponent } from './pages/busqueda-solicitud/busqueda-solicitud.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { VerificarCorreoComponent } from './pages/verificar-correo/verificar-correo.component';

const routes: Routes = [
  // { path: 'Inicio',loadChildren:()=> import('./pages/pages.module').then(m=>m.PagesModule) },
  { path: 'Inicio', component: InicioComponent, children: [{ path: "", component: InicioComponent }] },
  { path: 'Registrar-Solicitud', component: PagesComponent, children: [{ path: "", component: RegistrarSolicitudComponent }] },
  { path: 'Busqueda-Solicitud', component: PagesComponent, children: [{ path: "", component: BusquedaSolicitudComponent }] },
  { path: 'Verificar-Correo/:Identificador/:Code/:Email', component: PagesComponent, children: [{ path: "", component: VerificarCorreoComponent }] },
  { path:'**', redirectTo: '/Inicio',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
