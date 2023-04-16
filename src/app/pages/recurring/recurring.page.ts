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
  title = 'Recurring';
  tasks: Task[] = [];
  displayedTasks: Task[] = [];
  isSyncing = false;
  private subs = new SubSink();

  constructor(
    private navCtrl: NavController,
    private taskSrv: TaskService,
    private utilSrv: UtilityService
  ) {}

  ngOnInit() {
    this.getTasks();
  }

  ionViewDidEnter() {
    this.getTasks();
  }

  onSearchChange(e: any) {
    const query = e.target?.value.toLowerCase();
    this.displayedTasks = this.tasks.filter(
      (task) => {
        if(task.name) return task.name.toLowerCase().indexOf(query) > -1
        return false
      }
    );
    this.displayedTasks.reverse()
  }

  trackItems(index: number, taskObject: any) {
    return taskObject._id;
  }

  addTask() {
    this.navCtrl.navigateForward('recurring/new');
  }

  filterTasks(e: any) {
    const filter = e.target?.value.toLowerCase();
    switch(filter){
      case "all":
        this.displayedTasks = [...this.tasks];
        break;
      case "running":
        this.displayedTasks = this.tasks.filter(task => task.isRunning);
        break;
      case "stopped":
        this.displayedTasks = this.tasks.filter(task => !task.isRunning);
        break;
    }
    this.displayedTasks.reverse()
  }

  getTasks() {
    this.isSyncing = true;
    this.subs.sink = this.taskSrv.getTasks().subscribe({
      next: (result: any) => {
        this.tasks = [...result.data.tasks];
        this.displayedTasks = [...result.data.tasks];
        this.displayedTasks.reverse();
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        this.subs.unsubscribe();
        this.isSyncing = false;
      },
    });
  }

  getChatInfo(chatID: string) {
    return this.utilSrv.getChatInfo(chatID);
  }

  onClick(
    event: any,
    taskID: string | undefined,
    isRunning: boolean | undefined
  ) {
    event.stopPropagation();
    if (!taskID) {
      this.utilSrv.showToast('Invalid Task', 1000);
      return;
    }
    if (isRunning) {
      this.subs.sink = this.taskSrv.stopTask(taskID).subscribe({
        next: (result: any) => {
          this.utilSrv.showToast('Recurring message stopped', 1000);
          this.getTasks();
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
          this.subs.unsubscribe();
        },
      });
      return;
    }

    this.subs.sink = this.taskSrv.resumeTask(taskID).subscribe({
      next: (result: any) => {
        this.utilSrv.showToast('Recurring message resumed', 1000);
        this.getTasks();
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        // console.log('completed');
        this.subs.unsubscribe();
      },
    });
  }

  onDelete(taskID: string | undefined) {
    if (!taskID) {
      this.utilSrv.showToast('Invalid recurring message', 1000);
      return;
    }

    this.subs.sink = this.taskSrv.deleteTask(taskID)?.subscribe({
      next: (result: any) => {
        console.log(result);
        this.utilSrv.showToast('Recurring message deleted deleted', 1000);
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        this.subs.unsubscribe();
        this.getTasks();
      },
    });
  }
}
