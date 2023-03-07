import { Observable, Subject } from 'rxjs';
import { Message } from './../interfaces/message';
import { environment } from './../../environments/environment.prod';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})


export class MessagingService{
  baseUrl = environment.baseUrl;
  private isClientReady = new Subject<boolean>()

  constructor( private http: HttpClient, private socket: Socket) { }

  sendMessage(obj: Message){
    const url = this.baseUrl+'simplesend';
    return this.http.post(url, obj)
  }

  pingSocket(){
    this.socket.emit("connect_client")
  }

  onSocketEvents(){
    return  {
      qrcode: this.socket.fromEvent("qrcode"),
      ready: this.socket.fromEvent("client_ready")
    }
  }

  connectClient(){
    const email = localStorage.getItem("email")
    this.socket.emit("connect_client", email)
    // const url = this.baseUrl + `client/connect?clientID=${email}`
    // this.http.get(url).subscribe({
    //   next: (result) => {console.log(result)},
    //   error: (error) => {console.log(error)}
    // })
    // return new Promise((resolve) => {
    //   resolve(true)
    // })
  }

  getClientChats(){
    const email = localStorage.getItem("email")
    return this.http.get<{
      message: string,
      data: {chats: any[]},
      code: string
    }>(environment.baseUrl + "client/chats?email="+email)
  }

}
