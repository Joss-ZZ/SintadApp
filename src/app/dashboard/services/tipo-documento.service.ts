import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthResponse } from 'src/app/auth/interfaces/interface';
import { Tipo_Documento } from '../interfaces/tipo-documento.interface';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {

  baseUrl: string = environment.baseUrl;
  url: string = `${this.baseUrl}/tipo_documento`;
  url2: string = `${this.baseUrl}/tipo_documento_habilitado`;

  constructor(private http: HttpClient) { }

  listarTipoDocumento() {
    const token = new HttpHeaders()
        .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(this.url, {headers: token});
  }

  listarTipoDocumentoHabilitado() {
    const token = new HttpHeaders()
        .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(this.url2, {headers: token});
  }

  eliminarTipoDocumento(id: string){
    const token = new HttpHeaders()
        .set('x-token', localStorage.getItem('token') || '');

    return this.http.delete<AuthResponse>(`${this.url}/${id}`, {headers: token});

  }

  agregarTipoDocumento(tipoDocumento: Tipo_Documento){
    const token = new HttpHeaders()
          .set('x-token', localStorage.getItem('token') || '');

    return this.http.post<AuthResponse>(this.url, tipoDocumento ,{headers: token});
  }

  editarTipoDocumento(id: string, tipoDocumento: Tipo_Documento){
    const token = new HttpHeaders()
          .set('x-token', localStorage.getItem('token') || '');

    return this.http.put<AuthResponse>(`${this.url}/${id}`, tipoDocumento, {headers: token});

  }

}
