import { UtilityService } from './utility.service';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient, private utilSrv: UtilityService) {}

  createTask(obj: Task) {
    const email = localStorage.getItem('email');
    console.log(obj);
    const url = environment.baseUrl + 'tasks/create?email=' + email;
    return this.http.post(url, obj);
  }

  getTasks() {
    const email = localStorage.getItem('email');
    const url = environment.baseUrl + 'tasks?email=' + email;
    return this.http.get(url);
  }

  stopTask(taskID: string) {
    const email = localStorage.getItem('email');
    const url = environment.baseUrl + `tasks/${taskID}/stop`;
    return this.http.patch(url, { email, action: 'stop' });
  }

  resumeTask(taskID: string) {
    const email = localStorage.getItem('email');
    const url = environment.baseUrl + `tasks/${taskID}/resume`;
    return this.http.patch(url, { email });
  }

  deleteTask(taskID: string) {
    const email = localStorage.getItem('email');
    const url = environment.baseUrl + `tasks/${taskID}/delete`;
    if (!email) {
      this.utilSrv.showToast('Please login to delete task', 1000);
      return;
    }
    return this.http.delete(url, { params: { email } });
  }
}
