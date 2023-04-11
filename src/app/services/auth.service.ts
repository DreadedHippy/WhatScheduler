import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UtilityService } from './utility.service';
import { SubSink } from 'subsink';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private utilSrv: UtilityService
  ) { }

  private subs = new SubSink()
  private token: any;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private tokenTimer: any;

  signup(data: any){
    this.subs.sink = this.http.post(environment.baseUrl + 'auth/signup', data).subscribe({
      next: (result: any) => {
        this.utilSrv.showToast(result.message, 1000)
        this.navCtrl.navigateForward("/login")
      },
      error: (error) => {
        this.utilSrv.showToast(error.error.message, 1000)
      },
      complete: () => this.subs.unsubscribe()
    })
  }

  login(data: any){
    this.http.post(environment.baseUrl + 'auth/login', data).subscribe({
      next: (result: any) => {
        const now = new Date()
        const expirationDate = new Date(now.getTime() + (result.data.expiresIn * 1000));
        this.saveAuthData(result.data.user.email, result.data.token, expirationDate)
        this.setAuthTimer(result.data.expiresIn)
        this.isAuthenticated = true;
        this.utilSrv.isPaneHidden.next(false)
        this.navCtrl.navigateForward("/home")
      },
      error: (error) => {
        this.utilSrv.showToast(error.error.message, 1000)
      },
      complete: () => this.subs.unsubscribe()
    })
  }

  logout(){
    this.subs.sink = this.http.post(environment.baseUrl + 'auth/logout', {}).subscribe({
      next: (result: any) => {
        this.utilSrv.showToast(result.message, 1000)
        localStorage.clear()
        this.navCtrl.navigateRoot("/login");
        clearTimeout(this.tokenTimer);
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
      },
      error: (error) => {
        this.utilSrv.showToast(error.error.message, 1000)
      },
      complete: () => this.subs.unsubscribe()
    })
  }

  getToken(){
    return localStorage.getItem("token")
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  getIsAuth(){
    return this.isAuthenticated;
  }


  verifyUser(token: string){
    this.http.post(environment.baseUrl + 'auth/verify', {token}).subscribe({
      next: (result: any) => {
        this.utilSrv.showToast(result.message, 1000)
        this.navCtrl.navigateForward("/login")
      },
      error: (error) => {
        this.utilSrv.showToast(error.error.message, 1000)
        this.navCtrl.navigateForward("/login")
      },
      complete: () => this.subs.unsubscribe()
    })
  }


  autoAuthUser(){
    const authInformation = this.getAuthData();
    if(!authInformation){
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if(expiresIn > 0){
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
      this.navCtrl.navigateForward('/home');
    }
  }

  private getAuthData(){
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expirationDate');
    if (!token || !expirationDate){
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate)
    };
  }

  private setAuthTimer(duration: number){
    this.tokenTimer = setTimeout(() => {
      this.logout()
    }, duration * 1000)
  }

  private saveAuthData(email: string, token: string, expirationDate: Date){
    localStorage.setItem("email", email);
    localStorage.setItem("token", token)
    localStorage.setItem("expirationDate", expirationDate.toISOString())
  }
}
