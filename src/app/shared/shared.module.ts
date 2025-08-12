import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from './material.module';
import { PrimeNgModule } from './primeng.module';
import { ModalBodyComponent } from './components/modal/modal-body.component';
import { ModalConfirmacionComponet } from './components/modalConfirmacion/modal-confirmacion';
import { MenubarModule } from 'primeng/menubar';
import { MenuComponent } from './menu/menu.component';


const MODULES = [MaterialModule,PrimeNgModule]
const COMPONENTS = [ModalBodyComponent,ModalConfirmacionComponet,]

@NgModule({
  declarations: [COMPONENTS,MenuComponent],
  imports: [
    ...MODULES,
    CommonModule,
    MenubarModule
  ],
  exports:[
    ...MODULES,
    COMPONENTS,
    MenuComponent
  ]
})
export class SharedModule { }
