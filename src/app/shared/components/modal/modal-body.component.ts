import { Component, Input } from '@angular/core';

@Component({
    selector: 'modal-body',
    templateUrl: './modal-body.component.html'
})
export class ModalBodyComponent {
    @Input() disabledClose: boolean = false
    constructor(){ }
}