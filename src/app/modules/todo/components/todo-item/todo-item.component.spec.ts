import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Todo } from '../../models/Todo.model';
import { TodoService } from '../../services/todo.service';
import { TodoApiService } from '../../services/todo-api.service';
import { TodoItemComponent } from './todo-item.component';

describe('TodoComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoItemComponent],
      imports: [HttpClientModule],
      providers: [TodoApiService, TodoService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have notify true', () => {
    component.todo = new Todo(0, 'test', new Date().toDateString(), true);
    expect(component.checkNotify()).toBe(true);
  });

  it('should have defaut edit form value ', () => {
    const todo = new Todo(0, 'test', new Date().toDateString(), true);
    component.todo = todo;
    component.addDefaultEditContent();
    expect(component.editTodoForm.value).toEqual({
      content: todo.content,
      datetime: todo.deadline,
    });
  }); 

  
});
