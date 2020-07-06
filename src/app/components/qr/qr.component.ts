import { Product } from './../../models/product';
import { Component, OnInit, Input } from '@angular/core';
import {ProductService } from '../../services/product.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.css']
})
export class QrComponent implements OnInit {
value = '';

   productList: Product[];
  producto: any = [];
  @ Input() indice: any;
  bandera3: boolean = false;
  // constructor() { }
  constructor(public productService: ProductService) {


  // console.log('tu puedes shuy');
   // console.log(this.productService.getProducts);
   this.productService.getProducts()
    .snapshotChanges()
    .subscribe(item => {
      this.productList = [];
      item.forEach(element => {
        const x = element.payload.toJSON();
        // tslint:disable-next-line: no-string-literal
        x['$key'] = element.key;
        this.productList.push(x as Product);

      });
      this.producto = this.productList[this.indice].location;
      this.value = `Destino: ${this.producto} Precio: ${this.productList[this.indice].price} 
      Para viajar en: ${this.productList[this.indice].category}`;
      console.log(this.value);

    } );



}  // termina el constructor



// tslint:disable-next-line: member-ordering
elementType = 'canvas';

ngOnInit(): void {
  this.productService.getProducts();
  this.resetForm();
}

resetForm(productForm?: NgForm){
  if (productForm != null){
    productForm.reset();
    this.productService.selectedProduct = new Product();
  }
}


}
