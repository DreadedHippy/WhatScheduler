import { Message } from './../interfaces/message';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rejects } from 'assert';

@Injectable({
  providedIn: 'root'
})


export class MessagingService {
  baseUrl = environment.baseUrl

  constructor( private http: HttpClient) { }

  sendMessage(obj: Message){
    const url = this.baseUrl+'simplesend';
    return this.http.post(url, obj)
  }

  connectClient(){
    const email = localStorage.getItem("email")
    const url = this.baseUrl + `client/connnect?clientID=${email}`
    this.http.get(url).subscribe({
      next: (result) => {console.log(result)},
      error: (error) => {console.log(error)}
    })
    return new Promise((resolve) => {
      resolve(true)
    })
  }

}
