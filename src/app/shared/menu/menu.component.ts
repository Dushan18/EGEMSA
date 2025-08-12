import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";

@Component({
    selector:'app-menu',
    templateUrl:'./menu.component.html',
    styles:[]
})
export class MenuComponent implements OnInit{
    items: MenuItem[] = [];
    constructor(){}
    ngOnInit(): void {
        this.items = [
            {
              label:'GESTION',
              icon:'pi pi-folder',
              items:[
                {
                  label:'Gestionar Solicitudes',
                  icon:'pi - pi-align-left',
                  routerLink:'/Gestion/Solicitud'
                },
                {
                  label:'Ruta 2',
                  icon:'pi - pi-dollar',
                  routerLink:'numero'
                },
                {
                  label:'Ruta 3',
                  icon:'pi - pi-globe',
                  routerLink:'no-comunes'
                }
              ]
            },
            {
              label:'REPORTES',
              icon:'pi pi-file-pdf',
              // routerLink:'Reportes',
              items:[
                {
                  label:'Gestionar Reporte Anual',
                  icon:'pi - pi-calendar',
                  routerLink:'/Reporte/Reporte-Anual',
                },
                {
                  label:'Gestionar Reporte Trimestral',
                  icon:'pi - pi-calendar',
                  routerLink:'/Reporte/Reporte-Trimestral',
                },
                {
                  label:'Gestionar Reporte Trazabilidad',
                  icon:'pi - pi-calendar',
                  routerLink:'/Reporte/Reporte-Trazabilidad',
                }
              ]
            },
            {
              label:'MANTENIMIENTO',
              icon:'pi -pi-cog',
              // routerLink:'Mantenimiento',
              items:[
                {
                  label:'Gestionar Mantenimientos',
                  icon:'pi - pi-align-left',
                }
              ]
            }
        ];
    }
}