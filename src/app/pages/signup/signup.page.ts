import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UtilityService } from 'src/app/services/utility.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})

export class SignupPage implements OnInit {
  googleRedirectUri = environment.googleRedirectUri;
  signupForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })
  isSigningUp = false

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
    this.isSigningUp = true
    this.authSrv.signup(this.signupForm.value).then(result => {
      this.isSigningUp = false
    })
  }

  checkIfIsLoggedIn(){
    const isAuthenticated = this.authSrv.getIsAuth();
    if(isAuthenticated){
      this.navCtrl.navigateRoot("/home")
    }
  }

  gotoLogin(){
    this.navCtrl.navigateRoot("/login")
  }

}
