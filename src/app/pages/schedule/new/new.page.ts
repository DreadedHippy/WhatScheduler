import { MessagingService } from './../../../services/messaging.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {
  title = "New Schedule"
  messageForm = new FormGroup({
    chat: new FormControl('', Validators.required),
    message: new FormControl('', [Validators.required]),
    isInstant: new FormControl(true, [Validators.required]),
    date: new FormControl('')
  })
  clientChats: any[] = []

  constructor(
    private msgSrv: MessagingService
  ) { }

  ngOnInit() {
    if(this.msgSrv.clientChats.length > 0){
      this.clientChats = this.msgSrv.clientChats
      this.clientChats.sort()
    }
    this.msgSrv.getClientChats().then(chats => {
      this.clientChats = chats
      this.clientChats.sort()
    })
  }

  onMessageSubmit(){
    console.log(this.messageForm.value)
  }

}
