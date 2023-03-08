import { UtilityService } from './../../../services/utility.service';
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
  minDate = new Date().toISOString()

  constructor(
    private msgSrv: MessagingService,
    private utilSrv: UtilityService
  ) { }

  ngOnInit() {
    if(this.msgSrv.clientChats.length > 0){
      this.clientChats = this.msgSrv.clientChats
      return
    }
    this.msgSrv.getClientChats().then(chats => {
      this.clientChats = chats

    })
  }

  onMessageSubmit(){
    console.log(this.messageForm.value)
    if(this.messageForm.value.isInstant === false){
      if((this.messageForm.value.date == undefined || this.messageForm.value.date.length < 2)){
        this.utilSrv.showToast("Please choose a date", 500)
        return
      }

      const currentDate = new Date()
      const date = new Date(this.messageForm.value.date)

      if(currentDate.getTime() > date.getTime()){
        this.utilSrv.showToast("Please schedule a date in the future", 500)
        return
      }
    }
  }

}
