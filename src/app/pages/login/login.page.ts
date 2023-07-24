import { AuthService } from './../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit,} from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  googleRedirectUri = environment.googleRedirectUri;

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })
  isLoggingIn = false

  constructor(
    private authSrv: AuthService,
    private navCtrl: NavController,
    private utilSrv: UtilityService
  ) { }

  ngOnInit() {
    this.utilSrv.isPaneHidden.next(true)
    this.checkIfIsLoggedIn()
  }

  onSubmit(){
    this.isLoggingIn = true
    this.authSrv.login(this.loginForm.value).then( result => {
      this.isLoggingIn = false
    })
  }

  checkIfIsLoggedIn(){
    const isAuthenticated = this.authSrv.getIsAuth();
    if(isAuthenticated){
      this.navCtrl.navigateRoot("/home")
    }
  }

  gotoSignup(){
    this.navCtrl.navigateRoot("/signup")
  }
}
