import { Component, OnInit } from '@angular/core';
import { StartupService } from './shared/services/startup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'app-solicitudinformacion';

  constructor(private startupService: StartupService) {}

  async ngOnInit() {
    // ✅ Al iniciar la app, obtener y guardar el token público
    await this.startupService.cargarTokenPublico();
    console.log('✅ Token público obtenido y listo para ser usado en las peticiones.');
  }
}
