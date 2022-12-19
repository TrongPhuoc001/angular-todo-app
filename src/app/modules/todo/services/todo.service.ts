import { Injectable } from '@angular/core';

import { FilterOption } from '../shared/filter-option';

import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private activeFilter = new BehaviorSubject(FilterOption.ALL);

  constructor() {}

  public getActiveFilter() {
    return this.activeFilter.asObservable();
  }

  public setFilter(option: FilterOption) {
    this.activeFilter.next(option);
  }
}
