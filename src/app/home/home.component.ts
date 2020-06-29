import { ConsultasService } from './../services/consultas.service';
import { Component } from '@angular/core';
import { User } from '@shared/models/user.interface';
import { Observable } from 'rxjs';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public user$: Observable<User> = this.authSvc.afAuth.user;
  lang: any;
  constructor(public authSvc: AuthService, public consultas: ConsultasService ) {}
  resultado_consulta: any;

funciones(){
  this.consultas.hotel_economico().subscribe ( (data)=> {
    this.resultado_consulta=data['resp'];
    console.log(data);
  })
}

funciones2(){
  console.log("si pasa");
  this.consultas.promociones().subscribe ( (data) => {
    this.resultado_consulta=data["resp"];
    console.log(data);
  })
}
}

