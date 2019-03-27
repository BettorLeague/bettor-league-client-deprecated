import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AuthService} from "../../shared/services/authentication/auth.service";

@Injectable()
export class GuestGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/app']);
      return false;
    } else {
      return true;
    }
  }
}
