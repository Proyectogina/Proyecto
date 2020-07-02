import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Promotion} from '../models/promotion';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  promotionlist: AngularFireList<any>;
  selectedPromotion: Promotion = new Promotion();

  constructor(private firebase: AngularFireDatabase) { }

  getPromotions(){
    return this.promotionlist = this.firebase.list('promotions');
  }
}
