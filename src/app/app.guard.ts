import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppService } from './app.service';

@Injectable()
export class AppGuard implements CanActivate {
  constructor(private appService: AppService, private router: Router) {}

  canActivate(): boolean {
    if (this.appService.isAllow()) {
      return true;
    }

    this.router.navigate(['/todo']);
    return false;
  }
}
