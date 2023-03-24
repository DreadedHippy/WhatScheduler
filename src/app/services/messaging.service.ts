import { SubSink } from 'subsink';
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
  clientChats: any[] = [];
  private isClientReady = new Subject<boolean>()
  private clientState = false
  private subs = new SubSink();

  constructor( private http: HttpClient, private socket: Socket) { }

  sendMessage(obj: Message){
    const email = localStorage.getItem("email")
    let url = this.baseUrl+'client/send?email='+email;
    if(!obj.isInstant){
      url = this.baseUrl+'schedules/create?email='+email;
    }
    return this.http.post(url, obj)
  }

  pingSocket(){
    this.socket.emit("connect_client")
  }

  onSocketEvents(){
    return  {
      qrcode: this.socket.fromEvent("qrcode"),
      authenticated: this.socket.fromEvent("authenticated"),
      ready: this.socket.fromEvent("client_ready"),
    }
  }

  connectClient(){
    const email = localStorage.getItem("email")
    this.socket.emit("connect_client", email)

    this.subs.sink = this.onSocketEvents().ready.subscribe({
      next: () => {
        this.isClientReady.next(true);
        this.clientState = true
      },
      error: () => {
        this.isClientReady.next(false);
        this.clientState = false
      },
      complete: () => {this.subs.unsubscribe}
    })
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
    return new Promise<any[]>((resolve, reject) => {
      const email = localStorage.getItem("email")
      this.subs.sink = this.http.get<{
        message: string,
        data: {chats: any[]},
        code: string
      }>(environment.baseUrl + "client/chats?email="+email).subscribe({
        next: (result) => {
          console.log(result)
          this.clientChats = result.data.chats
          this.isClientReady.next(true)
          this.clientState = true
          resolve(this.clientChats)
        },
        error: (error) => {console.error(error)},
        complete: () => { this.subs.unsubscribe()}
      })
    })
  }

  getClientState(){
    return this.clientState
  }

  disconnectClient(){
    const email = localStorage.getItem("email")
    return this.http.get(this.baseUrl+'client/disconnect?email='+email)
  }

}
