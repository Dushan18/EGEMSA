import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import {CardModule} from 'primeng/card';
import { MenuItem as MenuItemPrimeNG } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import {ListboxModule} from 'primeng/listbox';
import { MenuComponent } from './menu/menu.component';
import {PanelModule} from 'primeng/panel';
import {InputNumberModule} from 'primeng/inputnumber';
import {RadioButtonModule} from 'primeng/radiobutton'
import {CheckboxModule} from 'primeng/checkbox';

const PRIMENG = [
    ButtonModule,
    MenubarModule,
    SelectButtonModule,
    ToolbarModule,
    TableModule,
    CardModule,
    CalendarModule,
    DropdownModule,
    FileUploadModule,
    HttpClientModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    ListboxModule,
    PanelModule,
    InputNumberModule,
    RadioButtonModule,
    CheckboxModule,
]

@NgModule({
    // declarations:[MenuComponent],
    imports: PRIMENG,
    exports: PRIMENG
})
export class PrimeNgModule { }