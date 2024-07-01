import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Adress } from 'src/app/interfaces/adress';

@Injectable({
  providedIn: 'root'
})
export class AdressService {

  private apiUrl = 'http://127.0.0.1:3333';  // Reemplaza con tu URL de API
  
  constructor(private http: HttpClient, private cookieService:CookieService) { }
  // Método para enviar una petición POST
  RegisterAdress(data: Adress,token:string): Observable<Adress> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.post<Adress>(`${this.apiUrl}/createAdress`, data, { headers });
  }
  viewAllAdress(token:string): Observable<Adress[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.get<Adress[]>(`${this.apiUrl}/viewAdress`,{headers});
 }
 viewPersonalAdress(token:String): Observable<Adress[]> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  });
  return this.http.get<Adress[]>(`${this.apiUrl}/viewpAdress`,{headers});
}
getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}
//AIzaSyDJaFDtQn1qn_OCy-o80iBjFI2CB5tiKiM
getAddress(latitude: number, longitude: number): Promise<any> {
  const apiKey = 'AIzaSyDJaFDtQn1qn_OCy-o80iBjFI2CB5tiKiM';
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
  return this.http.get(url).toPromise();
}
}
