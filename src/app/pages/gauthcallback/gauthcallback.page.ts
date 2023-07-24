import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-gauthcallback',
  templateUrl: './gauthcallback.page.html',
  styleUrls: ['./gauthcallback.page.scss'],
})
export class GauthcallbackPage implements OnInit {

  constructor(private route: ActivatedRoute, private authSrv: AuthService, private navCtrl: NavController) { }
  gcode!: string;

  ngOnInit() {
    let isLoggedIn = this.checkIfIsLoggedIn()

    if (isLoggedIn) {
      return
    }
    this.route.queryParams
    .subscribe((params: any)=> {
      console.log(params)
      this.gcode = params.code
      if (this.gcode) {
        this.authSrv.googleAuth(this.gcode);
      } else {
        console.log("No auth code returned")
      }


    })
  }

  checkIfIsLoggedIn(){
    const isAuthenticated = this.authSrv.getIsAuth();
    if(isAuthenticated){
      this.navCtrl.navigateRoot("/home")
      return true
    }
    return false
  }

}
