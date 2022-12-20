import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardComponent } from './components/guard/guard.component';
const routes: Routes = [
  {
    path: '',
    component: GuardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestGuardRoutingModule {}
