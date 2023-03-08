import { UtilityService } from './../services/utility.service';
import { MessagingService } from './../services/messaging.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { resolve } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class ClientGuard implements CanActivate {

  constructor(
    private msgSrv: MessagingService,
    private router: Router,
    private utilSrv: UtilityService
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isAllowed = this.msgSrv.getClientState();
      if(!isAllowed){
        this.router.navigate(['/home'])
        this.utilSrv.showToast("Connect to the client to proceed", 500)
        return false
      }
      return true
  }

}
