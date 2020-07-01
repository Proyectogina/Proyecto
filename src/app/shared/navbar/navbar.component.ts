import { User } from '@shared/models/user.interface';
import { Observable } from 'rxjs';
import { AuthService } from '@auth/services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public user$: Observable<User> = this.authSvc.afAuth.user;
  lang: any;
  bandera: boolean=false;

  constructor(public authSvc: AuthService, private router: Router) {}

  async onLogout() {
    try {
      await this.authSvc.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
  }

  decir(){
      if(this.bandera==true){
        speechSynthesis.cancel();
        this.bandera=false;
        return;
      }

    console.log('totis');
    console.log(document.getElementById('texto'));
    this.lang = new SpeechSynthesisUtterance(document.getElementById('texto').innerHTML);
    this.lang.lang = 'spa-Mx';
    this.bandera=true;
    speechSynthesis.speak(this.lang);
 }
}
