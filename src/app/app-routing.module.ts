import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppGuard } from './app.guard';
const routes: Routes = [
  {
    path: 'todo',
    loadChildren: () =>
      import('./modules/todo/todo.module').then((m) => m.TodoModule),
  },
  {
    path: 'test-guard',
    canActivate: [AppGuard],
    loadChildren: () =>
      import('./modules/test-guard/test-guard.module').then(
        (m) => m.TestGuardModule
      ),
  },
  {
    path: '',
    redirectTo: 'todo',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AppGuard],
  exports: [RouterModule],
})
export class AppRoutingModule {}
