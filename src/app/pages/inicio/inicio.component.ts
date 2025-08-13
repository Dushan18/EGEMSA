import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {


  // en tu componente
  infoOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

}
