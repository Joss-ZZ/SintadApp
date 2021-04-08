import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { AuthResponse, Usuario } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _usuario! : Usuario;

  constructor(private http: HttpClient) { }

  get usuario(){
    return {...this._usuario};
  }

  login(email: string, password: string) {

    const url = `${this.baseUrl}/auth/login`;
    const user = {email, password};

    return this.http.post<AuthResponse>(url, user)
            .pipe(
              tap(resp => {
                if(resp.ok){
                  localStorage.setItem('token', resp.token);
                }
              }), 
              map(resp => resp.ok),
              catchError(err => of(err.error.msg))
            )

  }

  validarToken() {

    const url = `${this.baseUrl}/auth/renew`;
    const token = new HttpHeaders()
                  .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(url, {headers: token})
              .pipe(
                tap(resp => {
                  localStorage.setItem('token', resp.token);
                  this._usuario = {
                    uid: resp.uid,
                    nombre: resp.nombre,
                    email: resp.email                               
                  }
                }),
                map(resp => resp.ok),
                catchError(err => of(false))
              )

  }

  logout() {
    localStorage.removeItem('token');
  }

}
