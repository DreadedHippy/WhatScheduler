import { UtilityService } from './utility.service';
import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient, private utilSrv: UtilityService) { }

  createTask(obj: Task){
    const email = localStorage.getItem("email")
    // if(!email){
    //   this.utilSrv.showToast("Something went wrong", 1000)
    //   return
    // }
    console.log(obj)
    const url = environment.baseUrl + 'tasks/create?email=' + email
    return this.http.post(url, obj)
  }
}
