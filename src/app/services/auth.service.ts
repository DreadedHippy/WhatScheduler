import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private navCtrl: NavController) { }

  login(data: any){
    return this.http.post(environment.baseUrl + 'auth', data).subscribe({
      next: (result: any) => {
        const now = new Date()
        const expirationDate = new Date(now.getTime() + (result.data.expiresIn * 1000));
        console.log("Result is:", result),
        localStorage.setItem("email", result.data.user.email);
        localStorage.setItem("token", result.data.token)
        localStorage.setItem("expirationDate", expirationDate.toISOString())
        this.navCtrl.navigateForward("/home")
      },
      error: (error) => {console.log(error)}
    })
  }

  getToken(){
    return localStorage.getItem("token")
  }
}
