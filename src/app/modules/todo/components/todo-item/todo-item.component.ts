import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/modules/todo/models/Todo.model';
import { TodoApiService } from 'src/app/modules/todo/services/todo-api.service';
import { TodoService } from 'src/app/modules/todo/services/todo.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoAction } from '../../shared/todo.action';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo = {} as Todo;

  notify = false;
  isEditting: boolean = false;
  editTodoForm = new FormGroup({
    content: new FormControl('', [Validators.required]),
    datetime: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}$'),
    ]),
  });
  constructor(
    private todoApiService: TodoApiService,
    private todoService: TodoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (this.checkNotify()) this.notify = true;
    this.addDefaultEditContent();
  }

  onDelete(): void {
    this.todoApiService.deleteTodo(this.todo).subscribe(
      () => {
        this.todoApiService.getTodosFromApi();
      },
      (error) => {
        this.toastr.error('Delete failed', 'Error',{timeOut:3000});
      }
    );
  }

  onChecked(): void {
    this.todo.isCompleted = !this.todo.isCompleted;
    this.todoApiService.updateTodo(this.todo).subscribe(
      () => {
       this.todoApiService.getTodosFromApi();
      },
      (error) => {
        this.todo.isCompleted = !this.todo.isCompleted;
        this.toastr.error('Checked todo failed', 'Error',{timeOut:3000});
      }
    );
  }

  onEdit(): void {
    if (!this.isEditting) {
      this.isEditting = true;
    } else {
      if (this.editTodoForm.valid) {
        this.todo.content = this.editTodoForm.value.content;
        this.todo.deadline = this.editTodoForm.value.datetime;
        this.todoApiService.updateTodo(this.todo).subscribe(
          () => {
           this.todoApiService.getTodosFromApi();
          },
          (error) => {
            this.toastr.error('Update todo failed', 'Error',{timeOut:3000});
          }
        );
        this.isEditting = false;
      } else {
        this.isEditting = false;
        this.addDefaultEditContent();
      }
    }
  }

  checkNotify(): boolean {
    const timeLeft =
      new Date(this.todo.deadline).getTime() - new Date().getTime();
    return timeLeft < 1000 * 60 * 60;
  }

  getTimeLeft(): string {
    const timeLeft =
      new Date(this.todo.deadline).getTime() - new Date().getTime();
    let result = '';
    if (timeLeft < 0) {
      result = 'Late: ';
    } else {
      result = 'Due in: ';
    }
    return result + this.getTimeFromMiliseconds(Math.abs(timeLeft));
  }

  getTimeFromMiliseconds(miliseconds: number): string {
    const seconds = Math.floor((miliseconds / 1000) % 60),
      minutes = Math.floor((miliseconds / (1000 * 60)) % 60),
      hours =
        Math.floor((miliseconds / (1000 * 60 * 60)) % 24) +
        Math.floor(miliseconds / (1000 * 60 * 60) / 24) * 24;
    const hoursS: string =
      hours < 10 ? '0' + hours.toString() : hours.toString();
    const minutesS =
      minutes < 10 ? '0' + minutes.toString() : minutes.toString();
    const secondsS =
      seconds < 10 ? '0' + seconds.toString() : seconds.toString();

    return hoursS + 'h' + minutesS + "'" + secondsS;
  }

  addDefaultEditContent(): void {
    this.editTodoForm.setValue({
      content: this.todo.content ? this.todo.content : '',
      datetime: !this.todo.deadline ? '' : this.todo.deadline.replace(',', 'T'),
    });
  }
}
