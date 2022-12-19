import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTodoFormComponent } from './components/add-todo-form/add-todo-form.component';
import { TodoComponent } from './todo.component';
const routes: Routes = [
  {
    path: '',
    component: TodoComponent,
  },
  {
    path: 'todo-add',
    component: AddTodoFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoRoutingModule {}
