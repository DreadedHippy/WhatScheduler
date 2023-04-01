import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }

  getSchedules( page = 1, limit = 8){
    return this.http.get(environment.baseUrl + `schedules?page=${page}&limit=${limit}`)
  }
}
