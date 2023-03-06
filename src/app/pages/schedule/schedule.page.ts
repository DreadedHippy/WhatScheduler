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
  private subs = new SubSink();
  constructor(private scheduleSrv: ScheduleService, private navCtrl: NavController) { }

  ngOnInit() {
    this.subs.sink = this.scheduleSrv.getSchedules().subscribe({
      next:(result: any) => {
        console.log(result);
      },
      error:(error: any) => {console.log(error)},
      complete: () => {
        this.subs.unsubscribe()
      }
    })
  }

  onSearchChange(event: any){
    const query = event.target?.value.toLowerCase();
    // this.results = this.data.filter(d => d.toLowerCase().indexOf(query) > -1);
  }

  addSchedule(){
    this.navCtrl.navigateForward("/schedule/new")
  }

}
