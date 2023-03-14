import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {
  title = "New Task"
  inputType = "interval"
  selectedInterval = "hourly"
  taskForm = new FormGroup({
    type: new FormControl('interval', [Validators.required]),
    cronString: new FormControl(''),
    interval: new FormGroup({
      minute: new FormControl(''),
      hour: new FormControl(''),
      day_of_month: new FormControl(''),
      month: new FormControl(''),
      day_of_week: new FormControl('')
    }),
  })



  minutes: CronObject[] = [
    {value: 0, display_text: ":00"},
    {value: 5, display_text: ":05"},
    {value: 10, display_text: ":10"},
    {value: 15, display_text: ":15"},
    {value: 20, display_text: ":20"},
    {value: 25, display_text: ":25"},
    {value: 30, display_text: ":30"},
    {value: 35, display_text: ":35"},
    {value: 40, display_text: ":40"},
    {value: 45, display_text: ":45"},
    {value: 50, display_text: ":50"},
    {value: 55, display_text: ":55"}
  ]
  hours: CronObject[] = [
    {value: 0, display_text: "00:"},
    {value: 1, display_text: "01:"},
    {value: 2, display_text: "02:"},
    {value: 3, display_text: "03:"},
    {value: 4, display_text: "04:"},
    {value: 5, display_text: "05:"},
    {value: 6, display_text: "06:"},
    {value: 7, display_text: "07:"},
    {value: 8, display_text: "08:"},
    {value: 9, display_text: "09:"},
    {value: 10, display_text: "10:"},
    {value: 11, display_text: "11:"},
    {value: 12, display_text: "12:"},
    {value: 13, display_text: "13:"},
    {value: 14, display_text: "14:"},
    {value: 15, display_text: "15:"},
    {value: 16, display_text: "16:"},
    {value: 17, display_text: "17:"},
    {value: 18, display_text: "18:"},
    {value: 19, display_text: "19:"},
    {value: 20, display_text: "20:"},
    {value: 21, display_text: "21:"},
    {value: 22, display_text: "22:"},
    {value: 23, display_text: "23:"},
  ]
  days_of_week: CronObject[] = [
    {value: 1, display_text: "Monday"},
    {value: 2, display_text: "Tuesday"},
    {value: 3, display_text: "Wednesday"},
    {value: 4, display_text: "Thursday"},
    {value: 5, display_text: "Friday"},
    {value: 6, display_text: "Saturday"},
    {value: 7, display_text: "Sunday"},
  ]

  months: CronObject[] = [
    {value: 1, display_text: "January"},
    {value: 2, display_text: "February"},
    {value: 3, display_text: "March"},
    {value: 4, display_text: "April"},
    {value: 5, display_text: "May"},
    {value: 6, display_text: "June"},
    {value: 7, display_text: "July"},
    {value: 8, display_text: "August"},
    {value: 9, display_text: "September"},
    {value: 10, display_text: "October"},
    {value: 11, display_text: "November"},
    {value: 12, display_text: "December"}
  ]

  days_of_month: CronObject[] = [
    {value: 1, display_text: "1st"},
    {value: 2, display_text: "2nd"},
    {value: 3, display_text: "3rd"},
    {value: 4, display_text: "4th"},
    {value: 5, display_text: "5th"},
    {value: 6, display_text: "6th"},
    {value: 7, display_text: "7th"},
    {value: 8, display_text: "8th"},
    {value: 9, display_text: "9th"},
    {value: 10, display_text: "10th"},
    {value: 11, display_text: "11th"},
    {value: 12, display_text: "12th"},
    {value: 13, display_text: "13th"},
    {value: 14, display_text: "14th"},
    {value: 15, display_text: "15th"},
    {value: 16, display_text: "16th"},
    {value: 17, display_text: "17th"},
    {value: 18, display_text: "18th"},
    {value: 19, display_text: "19th"},
    {value: 20, display_text: "20th"},
    {value: 21, display_text: "21st"},
    {value: 22, display_text: "22nd"},
    {value: 23, display_text: "23rd"},
    {value: 24, display_text: "24th"},
    {value: 25, display_text: "25th"},
    {value: 26, display_text: "26th"},
    {value: 27, display_text: "27th"},
    {value: 28, display_text: "28th"},
    {value: 29, display_text: "29th"},
    {value: 30, display_text: "30th"},
    {value: 31, display_text: "31st"}
  ]

  constructor() { }

  ngOnInit() {
  }

  minuteChange(e: any){
    console.log(e.detail.value)
  }

  onSubmit(){
    console.log("Submitting...")
  }

  changeType(e: any){
    this.inputType = e.target.value
  }

  changeInterval(e:any){
    this.selectedInterval = e.target.value
  }
}

interface CronObject {
  value: number;
  display_text: string;
}
