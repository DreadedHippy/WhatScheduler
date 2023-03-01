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

  form: FormGroup = new FormGroup({
    message: new FormControl('', Validators.required),
    isMessageInstant: new FormControl(true, Validators.required),
    date: new FormControl(this.date)
  })


  constructor( private msgSrv: MessagingService) { }

  ngOnInit() {
  }

  onClick(){
    console.log("Clicked!")
    this.msgSrv.connectClient().then( result => {
      console.log(result)
    })
  }

}
