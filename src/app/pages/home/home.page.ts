import { MessagingService } from './../../services/messaging.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  title = 'Home'

  constructor( private msgSrv: MessagingService) { }
  message = new FormControl('', Validators.required)

  ngOnInit() {
  }

  onClick(){
    if(!this.message.valid || !this.message.value){
      console.log('Enter a message');
      return
    }

    let msgObj = {message: this.message.value}
    console.log('Sent!', msgObj.message)
    this.message.reset()
    this.msgSrv.sendMessage(msgObj)
}

}
