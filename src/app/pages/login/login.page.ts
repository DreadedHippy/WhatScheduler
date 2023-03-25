import { AuthService } from './../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSplitPane } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  constructor(
    private authSrv: AuthService
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    // console.log("Submitted!")
    this.authSrv.login(this.loginForm.value)
  }
}
