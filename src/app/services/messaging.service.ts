import { Message } from './../interfaces/message';
import { environment } from './../../environments/environment.prod';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})


export class MessagingService{
  baseUrl = environment.baseUrl

  constructor( private http: HttpClient, private socket: Socket) { }

  sendMessage(obj: Message){
    const url = this.baseUrl+'simplesend';
    return this.http.post(url, obj)
  }

  pingSocket(){
    this.socket.emit("connect_client")
  }

  onQrCode(){
    return this.socket.fromEvent("qrcode")
  }

  connectClient(){
    const email = localStorage.getItem("email")
    const url = this.baseUrl + `client/connect?clientID=${email}`
    this.http.get(url).subscribe({
      next: (result) => {console.log(result)},
      error: (error) => {console.log(error)}
    })
    return new Promise((resolve) => {
      resolve(true)
    })
  }

}
