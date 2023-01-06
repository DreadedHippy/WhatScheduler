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
  frequency = new FormControl('')

  ngOnInit() {
  }

  onClick(){
    if(!this.message.value){
      console.log('Enter a message');
      return
    }

    let msgObj = {message: this.message.value, frequency: this.frequency.value}
    console.log('Sent!', msgObj)
    this.message.reset()
    this.frequency.reset()
    this.msgSrv.sendMessage(msgObj)
}

}
