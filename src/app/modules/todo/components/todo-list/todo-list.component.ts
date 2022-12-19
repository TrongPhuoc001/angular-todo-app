import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Todo } from '../../models/Todo.model';
import { TodoApiService } from '../../services/todo-api.service';
import { TodoService } from '../../services/todo.service';
import { FilterOption } from '../../shared/filter-option';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  todos: Todo[] = [];
  filteredTodos: Todo[] = this.todos;
  currentFilter: FilterOption = FilterOption.ALL;
  subscription: Subscription[] = [];
  errorMessage = '';
  constructor(
    private todoService: TodoService,
    private todoApiService: TodoApiService
  ) {}

  ngOnInit(): void {
    this.subscription.push(
      this.todoApiService.todos$.subscribe((todos) => {
        this.todos = todos;
        this.filteredTodos = todos;
      })
    );

    this.subscription.push(
      this.todoService.getActiveFilter().subscribe((filter) => {
        this.currentFilter = filter;
        this.filterData();
      })
    );
  }

  filterData() {
    switch (this.currentFilter) {
      case FilterOption.ACTIVE:
        this.filteredTodos = this.todos.filter((todo) => !todo.isCompleted);
        break;
      case FilterOption.COMPLETED:
        this.filteredTodos = this.todos.filter((todo) => todo.isCompleted);
        break;
      default:
        this.filteredTodos = this.todos;
        break;
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach((s) => s.unsubscribe());
  }
}
