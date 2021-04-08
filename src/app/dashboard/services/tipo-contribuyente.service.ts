import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from 'src/app/auth/interfaces/interface';
import { environment } from 'src/environments/environment';
import { Tipo_Contribuyente } from '../interfaces/tipo-contribuyente.interface';

@Injectable({
  providedIn: 'root'
})
export class TipoContribuyenteService {

  baseUrl: string = environment.baseUrl;
  url: string = `${this.baseUrl}/tipo_contribuyente`;
  url2: string = `${this.baseUrl}/tipo_contribuyente_habilitado`

  constructor(private http: HttpClient) { }

  listarTipoContribuyente() {
    const token = new HttpHeaders()
        .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(this.url, {headers: token});
  }

  listarTipoContribuyenteHabilitado() {
    const token = new HttpHeaders()
        .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(this.url2, {headers: token});
  }

  eliminarTipoContribuyente(id: string){
    const token = new HttpHeaders()
        .set('x-token', localStorage.getItem('token') || '');

    return this.http.delete<AuthResponse>(`${this.url}/${id}`, {headers: token});

  }

  agregarTipoContribuyente(tipoContribuyente: Tipo_Contribuyente){
    const token = new HttpHeaders()
          .set('x-token', localStorage.getItem('token') || '');

    return this.http.post<AuthResponse>(this.url, tipoContribuyente ,{headers: token});
  }

  editarTipoContribuyente(id: string, tipoContribuyente: Tipo_Contribuyente){
    const token = new HttpHeaders()
          .set('x-token', localStorage.getItem('token') || '');

    return this.http.put<AuthResponse>(`${this.url}/${id}`, tipoContribuyente, {headers: token});

  }

}
