import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Hotel} from '../models/hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  hotelist: AngularFireList<any>;
  selectedHotel: Hotel = new Hotel();

  constructor(private firebase: AngularFireDatabase) { }
  getHotels(){
    return this.hotelist = this.firebase.list('hoteles');
  }
}
