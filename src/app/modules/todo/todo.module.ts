import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TodoListComponent } from './components/todo-list/todo-list.component';
import { AddTodoFormComponent } from './components/add-todo-form/add-todo-form.component';
import { FilterTodoComponent } from './components/filter-todo/filter-todo.component';
import { TodoItemComponent } from 'src/app/modules/todo/components/todo-item/todo-item.component';
import { TodoComponent } from './todo.component';
import { ToastrModule } from 'ngx-toastr';
import { TodoRoutingModule } from './todo-routing.module';

@NgModule({
  declarations: [
    TodoListComponent,
    AddTodoFormComponent,
    FilterTodoComponent,
    TodoItemComponent,
    TodoComponent,
  ],
  imports: [
    TodoRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [HttpClientModule],
  bootstrap: [TodoComponent],
})
export class TodoModule {}
