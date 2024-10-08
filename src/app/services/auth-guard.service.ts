import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const localData = localStorage.getItem('angular17token');
    
    if (localData !== null) {
      return true; 
    } else {
      this.router.navigateByUrl('/login'); 
      return false; 
    }
  }
}
