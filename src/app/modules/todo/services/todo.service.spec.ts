import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AddTodoFormComponent } from '../components/add-todo-form/add-todo-form.component';
import { FilterTodoComponent } from '../components/filter-todo/filter-todo.component';
import { TodoListComponent } from '../components/todo-list/todo-list.component';
import { TodoItemComponent } from '../components/todo-item/todo-item.component';
import { Todo } from '../models/Todo.model';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddTodoFormComponent,
        TodoItemComponent,
        FilterTodoComponent,
        TodoListComponent,
      ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [TodoService],
    });
    service = TestBed.get(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });



  
});
