import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class MessagingService {
  baseUrl = environment.baseUrl

  constructor( private http: HttpClient) { }

  sendMessage(obj: {message: string}){
    const url = this.baseUrl+'simplesend';

    this.http.post(url, obj).subscribe(response => {
      console.log(response)
      return response
    })
  }

}
