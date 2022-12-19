import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { TodoApiService } from '../../services/todo-api.service';
import { TodoService } from '../../services/todo.service';
import { AddTodoFormComponent } from './add-todo-form.component';

describe('AddTodoFormComponent', () => {
  let component: AddTodoFormComponent;
  let fixture: ComponentFixture<AddTodoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTodoFormComponent],
      imports: [HttpClientModule, ReactiveFormsModule, ToastrModule],
      providers: [TodoApiService, TodoService, ToastrService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have input type text', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('input').type).toBe('text');
  });

  it('should have input type time', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('input[type=\'time\']').type).toBeTruthy();
  });

  it('should have input type date', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("input[type='date']").type).toBeTruthy();
  });

  it('should prevent empty form submit', async () => {
    component.todoForm.patchValue({
      content: '',
    })

    const check = await component.onSubmit();

    expect(check).toBeFalsy();
  });

  it('should add default time to form with 10 minutes more', () => {
    component.addDefaultTime();
    const today = new Date();
    const tenMinuteMore = new Date(today.getTime() + 10 * 60000);
  
    expect(component.todoForm.value.date).toBe(tenMinuteMore.toISOString().substring(0, 10));
    expect(component.todoForm.value.time).toBe(tenMinuteMore.toString().substring(16, 21));
  });
});
