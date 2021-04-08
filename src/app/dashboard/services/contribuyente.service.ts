import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from 'src/app/auth/interfaces/interface';
import { environment } from 'src/environments/environment';
import { Contribuyente } from '../interfaces/contribuyente.interface';

@Injectable({
  providedIn: 'root'
})
export class ContribuyenteService {

  baseUrl: string = environment.baseUrl;
  url: string = `${this.baseUrl}/contribuyente`;

  constructor(private http: HttpClient) { }

  listarContribuyente() {
    const token = new HttpHeaders()
        .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(this.url, {headers: token});
  }

  eliminarContribuyente(id: string){
    const token = new HttpHeaders()
        .set('x-token', localStorage.getItem('token') || '');

    return this.http.delete<AuthResponse>(`${this.url}/${id}`, {headers: token});

  }

  agregarContribuyente(contribuyente: Contribuyente){
    const token = new HttpHeaders()
          .set('x-token', localStorage.getItem('token') || '');

    return this.http.post<AuthResponse>(this.url, contribuyente ,{headers: token});
  }

  editarContribuyente(id: string, contribuyente: Contribuyente){
    const token = new HttpHeaders()
          .set('x-token', localStorage.getItem('token') || '');

    return this.http.put<AuthResponse>(`${this.url}/${id}`, contribuyente, {headers: token});

  }

}
