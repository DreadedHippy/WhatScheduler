import { SubSink } from 'subsink';
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
  isClientReady = false;
  clientChats: any[] = [];
  private subs = new SubSink

  form: FormGroup = new FormGroup({
    message: new FormControl('', Validators.required),
    isMessageInstant: new FormControl(true, Validators.required),
    date: new FormControl(this.date)
  })


  constructor( private msgSrv: MessagingService) { }

  ngOnInit() {
    const events = this.msgSrv.onSocketEvents()
    if(this.msgSrv.clientChats.length > 0){
      this.isClientLoading = false
      this.isClientReady = true
      this.clientChats = this.msgSrv.clientChats
      return
    }
    this.subs.sink = events.qrcode.subscribe( (code: any) => {
      this.isQRCodeReceived = true
      this.clientQRCode = code
      console.log({clientQR: this.clientQRCode})
      this.isClientLoading = false
    })

    this.subs.sink = events.ready.subscribe({
      next: () => {
        this.isClientReady = true;
        this.getChats()
      },
      complete: () => {this.subs.unsubscribe}
    })
  }

  onConnect(){
    this.isButtonDisabled = true
    this.isClientLoading = true
    // this.msgSrv.pingSocket()
    this.msgSrv.connectClient();
  }

  getChats(){
    this.msgSrv.getClientChats().then( result => {
      this.clientChats = result
    })
  }

}
