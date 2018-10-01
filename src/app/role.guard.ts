import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let roles = next.data["roles"] as Array<string>;

    const token = localStorage.getItem('token');
    const userRole = jwt_decode(token).data.role;

    if (roles.indexOf(userRole)) {
      return true;
    }

    this.router.navigateByUrl('/home');
    return false;

  }
}
