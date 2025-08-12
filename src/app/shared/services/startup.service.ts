import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StartupService {
  constructor(private http: HttpClient) {}

  async cargarTokenPublico(): Promise<void> {
    try {
      const response = await this.http.get<any>(`${environment.urlAPI}Auth/get-public-token`).toPromise();

      if (response?.status && response.token) {
        localStorage.setItem('jwtToken', response.token);
        console.log("✅ Token público cargado y almacenado.");
      } else {
        console.error("❌ No se pudo obtener el token público.");
      }
    } catch (error) {
      console.error("❌ Error al obtener el token público:", error);
    }
  }
}
