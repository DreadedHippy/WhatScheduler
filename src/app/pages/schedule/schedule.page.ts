import { MessagingService } from './../../services/messaging.service';
import { UtilityService } from './../../services/utility.service';
import { Schedule } from './../../interfaces/schedule';
import { NavController } from '@ionic/angular';
import { ScheduleService } from './../../services/schedule.service';
import { Component, OnInit } from '@angular/core';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {

  title = "Schedules";
  schedules: Schedule[] = []
  displayedSchedules: Schedule[] = []
  scheduleType = ""
  isSyncing = true
  timeFormat: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    // second: 'numeric',
  };
  private subs = new SubSink();
  constructor(
    private scheduleSrv: ScheduleService,
    private msgSrv: MessagingService,
    private navCtrl: NavController,
    private utilSrv: UtilityService
    ) { }

  ngOnInit() {
    this.subs.sink = this.scheduleSrv.getSchedules().subscribe({
      next:(result: any) => {
        console.log(result);
        this.schedules = [...result.data.schedules]
        this.displayedSchedules = [...this.schedules]
        this.displayedSchedules.reverse()
      },
      error:(error: any) => {console.log(error)},
      complete: () => {
        this.subs.unsubscribe();
        this.isSyncing = false;
      }
    })
  }

  onSearchChange(event: any){
    const query = event.target?.value.toLowerCase();
    // this.displayedSchedules = this.schedules.filter(d => d.toLowerCase().indexOf(query) > -1);
  }

  addSchedule(){
    this.navCtrl.navigateForward("/schedule/new")
  }

  toDate(dateString: any){
    return this.utilSrv.toDate(dateString, this.timeFormat)
  }

  getChatInfo(chatID: string){
    return this.utilSrv.getChatInfo(chatID)
  }

  onDelete(scheduleID: string){
    console.log("Working on it...")
  }

  onFilterChange(event: any){
    const value = event.detail.value
    if(value !== "all"){
      this.displayedSchedules = this.schedules.filter(schedule => {
        return schedule.status == value
      })
      this.displayedSchedules.reverse()
    }else{
      this.displayedSchedules = [...this.schedules]
      this.displayedSchedules.reverse()
    }
  }
}
