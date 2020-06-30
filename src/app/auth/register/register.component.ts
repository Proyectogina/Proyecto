import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AuthService } from '@auth/services/auth.service';
import { Router } from '@angular/router';
import { User } from '@app/shared/models/user.interface';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authSvc: AuthService, private router: Router) {}

  async onRegister(confirmpass:string) {
    const { email, password } = this.registerForm.value;

    console.log(password);
    console.log(confirmpass);
    try {
      const user = await this.authSvc.register(email, password, confirmpass);
      if (user) {
        this.checkUserIsVerified(user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  private checkUserIsVerified(user: User) {
    if (user && user.emailVerified) {
      this.router.navigate(['/homes']);
      ///hola
    } else if (user) {
      this.router.navigate(['/verification-email']);
    } else {
      this.router.navigate(['/register']);
    }
  }
}
