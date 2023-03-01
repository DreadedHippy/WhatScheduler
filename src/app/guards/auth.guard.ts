import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const expiration = localStorage.getItem("expirationDate")
      console.log(expiration)
      if(expiration){
        const expirationDate = new Date(expiration)
        let now = new Date()
        const expiresIn = expirationDate.getTime() - now.getTime()
        if(expiresIn > 0 ){
          return true
        }
        localStorage.clear()
        this.router.navigate(['/login'])
        return false
      }
      this.router.navigate(['/login'])
      return false
  }

}
