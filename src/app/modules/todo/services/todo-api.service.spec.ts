import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AddTodoFormComponent } from '../components/add-todo-form/add-todo-form.component';
import { FilterTodoComponent } from '../components/filter-todo/filter-todo.component';
import { TodoItemComponent } from '../components/todo-item/todo-item.component';
import { TodoListComponent } from '../components/todo-list/todo-list.component';

import { TodoApiService } from './todo-api.service';

describe('TodoApiService', () => {
  let service: TodoApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddTodoFormComponent,
        TodoItemComponent,
        FilterTodoComponent,
        TodoListComponent,
      ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [TodoApiService],
    });
    service = TestBed.inject(TodoApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
