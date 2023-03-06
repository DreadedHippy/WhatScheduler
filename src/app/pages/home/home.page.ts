import { Message } from './../../interfaces/message';
import { MessagingService } from './../../services/messaging.service';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  title = 'Home'
  isButtonDisabled = false;
  date = (new Date()).toISOString()
  clientQRCode : any = "";
  isQRCodeReceived = false;
  isClientLoading = false;

  form: FormGroup = new FormGroup({
    message: new FormControl('', Validators.required),
    isMessageInstant: new FormControl(true, Validators.required),
    date: new FormControl(this.date)
  })


  constructor( private msgSrv: MessagingService) { }

  ngOnInit() {
    this.msgSrv.onQrCode().subscribe( code => {
      this.isQRCodeReceived = true
      this.clientQRCode = code
      console.log({clientQR: this.clientQRCode})
      this.isClientLoading = false
    })
  }

  onConnect(){
    this.isButtonDisabled = true
    this.isClientLoading = true
    // this.msgSrv.pingSocket()
    this.msgSrv.connectClient().then( (result) => {
      console.log(result)
    })
  }

}
