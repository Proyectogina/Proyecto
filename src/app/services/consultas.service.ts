import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {
    constructor(private _http: HttpClient) { }
  

  hotel_economico() {
      return this._http.get('http://localhost:3000/hotelb');
  }

  promociones() {
      console.log("pasa por aqui");
      return this._http.get('http://localhost:3000/promociones');
  }


}
