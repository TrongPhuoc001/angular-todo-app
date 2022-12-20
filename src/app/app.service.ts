import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AppService {
  private allow = new BehaviorSubject(false);

  constructor() {}

  public getActiveFilter() {
    return this.allow.asObservable();
  }

  public setAllow(option: boolean) {
    this.allow.next(option);
  }

  public isAllow() {
    return this.allow.value;
  }
}
