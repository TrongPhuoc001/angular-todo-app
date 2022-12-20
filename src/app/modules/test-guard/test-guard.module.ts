import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuardComponent } from './components/guard/guard.component';
import { TestGuardRoutingModule } from './test-guard-routing.module';

@NgModule({
  declarations: [GuardComponent],
  imports: [CommonModule, TestGuardRoutingModule],
})
export class TestGuardModule {}
