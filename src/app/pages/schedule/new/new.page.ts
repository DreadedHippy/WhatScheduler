import { SubSink } from 'subsink';
import { Message } from './../../../interfaces/message';
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
    chatIDs: new FormControl<string[]|null>([], Validators.required),
    message: new FormControl('', [Validators.required]),
    isInstant: new FormControl(false, [Validators.required]),
    date: new FormControl('')
  })
  clientChats: any[] = []
  displayedChats: any[] = []
  chat: any = null
  minDate = new Date().toISOString()
  private subs = new SubSink()

  constructor(
    private msgSrv: MessagingService,
    private utilSrv: UtilityService
  ) { }

  ngOnInit() {
    if(this.msgSrv.clientChats.length > 0){
      this.clientChats = this.msgSrv.clientChats
      this.displayedChats = [...this.clientChats]
      return
    }
    this.msgSrv.getClientChats().then(chats => {
      this.clientChats = chats
      this.displayedChats = [...this.clientChats]

    })
  }

  onMessageSubmit(){
    console.log(this.messageForm.value)
    //Guards
    // if(this.messageForm.value.isInstant === false){
    //   if(!(this.messageForm.value.date)){
    //     this.utilSrv.showToast("Please choose a date", 500)
    //     return
    //   }

    //   const currentDate = new Date()
    //   const date = new Date(this.messageForm.value.date)

    //   if((currentDate.getTime() + (1 * 60 * 1000)) > date.getTime()){
    //     this.utilSrv.showToast("Please schedule at least one minute ahead", 500)
    //     return
    //   }
    // }

    // const info: Message = {
    //   chatIDs: this.messageForm.value.chatIDs,
    //   message: this.messageForm.value.message,
    //   isInstant: this.messageForm.value.isInstant,
    //   date: this.messageForm.value.date
    // }

    // this.subs.sink = this.msgSrv.sendMessage(info).subscribe({
    //   next: (result: any) => {
    //     console.log(result)
    //     this.utilSrv.showToast(result.message, 800)
    //   },
    //   error: (error: any) => {
    //     console.log(error)
    //     this.utilSrv.showToast(error.error.message, 800)
    //   },
    //   complete: () => {
    //     console.log("Response received")
    //   }
    // })
  }

  onSearchChange(event: any){
    const query = event.target?.value.toLowerCase();
    this.displayedChats = this.clientChats.filter(chat => chat.name.toLowerCase().indexOf(query) > -1);
  }

  onChatsChange(event: any){
    console.log("chats: ", event.value)
  }
}
