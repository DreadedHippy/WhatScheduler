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

  getYears(date: string){
    return([(new Date(date)).getFullYear(), (Number((new Date(date)).getFullYear()) + 1).toString()])
  }

  setFormEnabled(state: boolean){
    if(state == true){
      this.isButtonDisabled = false
      this.form.enable()
    }
    if(state == false){
      this.isButtonDisabled = true
      this.form.disable()
    }
  }

  async onClick(){
    if(!this.form.valid){
      console.log('Enter a message');
      return
    }

    const message = this.form.get('message')?.value
    const isMessageInstant = this.form.get('isMessageInstant')?.value
    const date = this.form.get('date')?.value
    const compareDate1 = new Date(date)
    const compareDate2 = new Date(Date.now())

    if(compareDate2.getTime() > (compareDate1.getTime() + 60000)){
      console.log('You cannot schedule less than one minute ahead');
      return
    }

    await this.setFormEnabled(false)

    if(isMessageInstant){
      const msgObj: Message = {content: message, isInstant: true, date: undefined}
      this.msgSrv.sendMessage(msgObj).subscribe({
        next: (response) => {
          console.log(response)
          this.setFormEnabled(true)
        },
        error: (err) => {
          console.log(err)
          this.setFormEnabled(true)
        }
      })
    }
    if(!isMessageInstant){
      const msgObj: Message = {content: message, isInstant: false, date: date}
      this.msgSrv.sendMessage(msgObj).subscribe({
        next: (response) => {
          console.log(response)
          this.setFormEnabled(true)
        },
        error: (err) => {
          console.log(err)
          this.setFormEnabled(true)
        }
      })
    }
    this.form.reset()
  }

}
