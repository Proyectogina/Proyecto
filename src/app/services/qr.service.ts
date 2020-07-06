import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QrService {
  URI: string;

  constructor(private http: HttpClient) {
    this.URI = 'http://localhost:3000/qr/';
   }

   realizarConsulta(body: any){
    return this.http.post(`${this.URI}`, body);
  }

}
