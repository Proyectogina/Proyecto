import { FormGroup, FormControl } from '@angular/forms';
import { Component } from '@angular/core';

import { AuthService } from '@auth/services/auth.service';
import { Router } from '@angular/router';
import { User } from '@app/shared/models/user.interface';
import Swal from 'sweetalert2';
import { OnInit } from '@angular/core';
import { WindowService } from '../../services/window.service'; //Telefono
import * as firebase from 'firebase'; //telefono
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  banderita:boolean=false;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    confirmpass: new FormControl(''),
  });

  telform = new FormGroup({
    telefono: new FormControl(''),
    codigo: new FormControl(''),
  });
  constructor(private authSvc: AuthService, private router: Router ,private win: WindowService) {}

  async onGoogleLogin() {
    try {
      const user = await this.authSvc.loginGoogle();
      if (user) {
        this.checkUserIsVerified(user);
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'Cool'
      });
      console.log(error);
    }
  }

  async onLogin() {
    const { email, password,confirmpass } = this.loginForm.value;
    try {
      const user = await this.authSvc.login(email, password,confirmpass);
      if (user) {
        this.checkUserIsVerified(user);
      } 
    } catch (error) {
       Swal.fire(
         'Error!',
         'Do you want to continue',
         'error',
        
      );
      console.log(error);
    }
  }

  private checkUserIsVerified(user: User) {
    if (user && user.emailVerified) {
      this.router.navigate(['/home']);
    } else if (user) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/register']);
    }
  }

  ////PARTE DEL TELEFONO

  windowRef: any;

  phoneNumber = new PhoneNumber()

  verificationCode: string;

  user: any;

  ngOnInit() {
    this.windowRef = this.win.windowRef
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')

    this.windowRef.recaptchaVerifier.render()
  }


  sendLoginCode() {

    const appVerifier = this.windowRef.recaptchaVerifier;

    const telefono = this.telform.value;
    console.log(telefono.telefono);

    firebase.auth().signInWithPhoneNumber(telefono.telefono, appVerifier)
            .then(result => {

                this.windowRef.confirmationResult = result;
                console.log(result);
                this.banderita=true;

            })
            .catch( error => console.log(error) );

  }

  verifyLoginCode() {
    const codigo = this.telform.value;
    this.windowRef.confirmationResult
                  .confirm(codigo.codigo)
                  .then( result => {

                    this.user = result.user;

    })
    .catch( error => console.log(error, "Incorrect code entered?"));
  }


}



export class PhoneNumber {
  country: string;
  area: string;
  prefix: string;
  line: string;

  // format phone numbers as E.164
  get e164() {
    const num = this.country + this.area + this.prefix + this.line
    return `+${num}`
  }

}
