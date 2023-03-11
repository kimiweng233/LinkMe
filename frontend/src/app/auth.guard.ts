import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Service } from 'src/app/services/service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private service: Service) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.service.verifyCurrentUserID(route.params['id']).subscribe(
        response => {
          if (!response) {
            this.router.navigateByUrl('/home');
            return false;
          }
          this.service.giveLoadingPermisison();
          return true;
        },
        error => {
          this.router.navigateByUrl('/home');
          return false;
        }
      )
      return true;
  }
}
