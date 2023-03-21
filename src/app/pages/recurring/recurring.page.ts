import { UtilityService } from './../../services/utility.service';
import { SubSink } from 'subsink';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { MessagingService } from 'src/app/services/messaging.service';
import { Task } from 'src/app/interfaces/task';

@Component({
  selector: 'app-recurring',
  templateUrl: './recurring.page.html',
  styleUrls: ['./recurring.page.scss'],
})
export class RecurringPage implements OnInit {
  title = "Recurring";
  tasks: Task[] = []
  displayedTasks: Task[] = [];
  isSyncing = false;
  private subs = new SubSink()

  constructor(
    private navCtrl: NavController,
    private taskSrv: TaskService,
    private utilSrv: UtilityService
  ) { }

  ngOnInit() {
    this.getTasks()
  }

  onSearchChange(e: any){

  }

  addTask(){
    this.navCtrl.navigateForward("recurring/new")
  }

  getTasks(){
    this.isSyncing = true;
    this.subs.sink = this.taskSrv.getTasks().subscribe({
      next: (result: any) => {
        console.log(result);
        this.tasks = [...result.data.tasks]
        this.displayedTasks = [...result.data.tasks]
        this.displayedTasks.reverse()
      },
      error: (error: any) => {
        console.log(error)
      },
      complete: () => {
        console.log("completed");
        this.subs.unsubscribe();
        this.isSyncing = false;
      }
    })
  }

  getChatInfo(chatID: string){
    return this.utilSrv.getChatInfo(chatID)
  }

  onClick(event: any, taskID: string | undefined){
    event.stopPropagation()
    if(!taskID){
      this.utilSrv.showToast("InvalidTask", 1000)
      return
    }
    this.subs.sink = this.taskSrv.stopTask(taskID).subscribe({
      next: (result: any) => {
        console.log(result)
        this.getTasks()
      }, error: (error: any) => {
        console.log(error)
      }, complete: () => {
        console.log("completed")
      }
    })

  }

  onDelete(taskID: string | undefined){
    console.log("Trying to delete")
  }
}
