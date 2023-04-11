import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private authSrv: AuthService
  ) { }
  isSyncing = true

  ngOnInit() {
    this.verifyUser()
  }

  verifyUser(){
    this.route.queryParams.subscribe({
      next:(queries: Params) => {
        const token = queries['token'];
        console.log(token)
        this.authSrv.verifyUser(token)
      }
    })
  }

}
