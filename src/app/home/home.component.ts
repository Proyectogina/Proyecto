import { ConsultasService } from './../services/consultas.service';
import { Component } from '@angular/core';
import { User } from '@shared/models/user.interface';
import { Observable } from 'rxjs';
import { AuthService } from '@auth/services/auth.service';
import { Router } from '@angular/router';

//services
import {PromotionService} from '../services/promotion.service';
import {HotelService} from '../services/hotel.service';


//classPromotion,Hotel

import {Promotion} from '../models/promotion';
import {Hotel} from '../models/hotel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public user$: Observable<User> = this.authSvc.afAuth.user;
  lang: any;

  permissionhotel:any;
  permissionpromotion:any;


  promotionsList:Promotion[];
  hotelsList:Hotel[];

  constructor(public authSvc: AuthService, public consultas: ConsultasService,router: Router, private promotionService:PromotionService, private hotelService:HotelService) {}
  resultado_consulta: any;

  ngOnInit(): void {
    this.promotionService.getPromotions()
    .snapshotChanges()
    .subscribe(item=>{
      this.promotionsList=[];
      item.forEach(element =>{
        let x = element.payload.toJSON();
        x["$key"]=element.key;
        this.promotionsList.push(x as Promotion);
      });
    });

    this.hotelService.getHotels()
    .snapshotChanges()
    .subscribe(item=>{
      this.hotelsList=[];
      item.forEach(element =>{
        let y = element.payload.toJSON();
        y["$key"]=element.key;
        this.hotelsList.push(y as Hotel);
      });
    });
  }

funciones(){
  //LUGAR ECONOMICO
  console.log(this.hotelsList);
  console.log("hello");
  this.permissionhotel=true;



  //this.consultas.hotel_economico().subscribe ( (data)=> {
  //this.resultado_consulta=data['resp'];
   // console.log(data);
  //})
}

funciones2(){
  //PROMOCIONES
  
  console.log(this.promotionsList);
  console.log("Promociones");
  this.permissionpromotion=true;
  
  
  
  //console.log("si pasa");
  //this.consultas.promociones().subscribe ( (data) => {
  //  this.resultado_consulta=data["resp"];
   // console.log(data);
 // })
}
}

