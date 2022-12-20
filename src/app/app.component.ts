import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private appService: AppService) {}
  isAllow = false;
  subscription: any;
  ngOnInit() {
    this.subscription = this.appService.getActiveFilter().subscribe((allow) => {
      this.isAllow = allow;
    });
  }

  public toggleAllow() {
    this.appService.setAllow(!this.appService.isAllow());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
