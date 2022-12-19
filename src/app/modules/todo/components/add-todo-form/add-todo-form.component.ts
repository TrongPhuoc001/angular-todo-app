import { Component, OnDestroy, OnInit } from '@angular/core';
import { Todo } from '../../models/Todo.model';
import { TodoApiService } from '../../services/todo-api.service';
import { TodoService } from '../../services/todo.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-todo-form',
  templateUrl: './add-todo-form.component.html',
  styleUrls: ['./add-todo-form.component.scss'],
})
export class AddTodoFormComponent implements OnInit {
  today: Date = new Date();

  isLoading: boolean = false;

  todoForm = new FormGroup({
    content: new FormControl('', [Validators.required]),
    time: new FormControl('', [
      Validators.required,
      Validators.pattern('^([0-1][0-9]|2[0-3]):[0-5][0-9]$'),
    ]),
    date: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{4}-[0-9]{2}-[0-9]{2}$'),
    ]),
  });
  errorMessage = '';
  constructor(
    private todoApiService: TodoApiService,
    private todoService: TodoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.addDefaultTime();
  }

  onSubmit(): boolean {
    this.isLoading = true;
    if (!this.todoForm.valid) {
      this.errorMessage = 'Please fill in all the required fields';
      this.isLoading = false;
      return false;
    }
    this.todoApiService
      .postTodo(
        new Todo(
          0,
          this.todoForm.value.content,
          this.todoForm.value.date + 'T' + this.todoForm.value.time,
          false
        )
      )
      .subscribe(
        (data) => {
          this.todoForm.reset();
          this.addDefaultTime();
          this.isLoading = false;
          this.errorMessage = '';
          this.todoApiService.getTodosFromApi();
        },
        (error) => {
          this.toastr.error(error.error.message, 'Error');
          this.isLoading = false;
        }
      );
    return true;
  }

  addDefaultTime() {
    const hour = this.today.getHours();
    const minute = this.today.getMinutes();
    if (minute < 50) {
      this.todoForm.patchValue({
        date: this.today.toLocaleDateString('en-CA'),
        time: (hour < 10 ? '0' + hour : hour) + ':' + (minute + 10).toString(),
      });
    } else {
      this.todoForm.patchValue({
        date: this.today.toLocaleDateString('en-CA'),
        time:
          (hour + 1 < 10 ? '0' + (hour + 1) : hour + 1) +
          ':' +
          '0' +
          (minute + 10 - 60).toString(),
      });
    }
  }
}
