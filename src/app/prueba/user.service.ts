import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:3333';  // Reemplaza con tu URL de API

  constructor(private http: HttpClient, private cookiesService:CookieService) { }
token = this.cookiesService.get('token')
  // Método para enviar una petición POST
  Register(data: User ,token: string): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<User>(`${this.apiUrl}/register`, { ...data, token }, { headers });
  }
  Login(data: {uid:string; password: string}): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${this.apiUrl}/login`, data, { headers });
  }
  logout(data:User): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token

    });
    return this.http.post<any>(`${this.apiUrl}/logout`,{ headers });
  }
}
