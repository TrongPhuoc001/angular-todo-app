import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Todo } from '../models/Todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoApiService {
  URL = environment.API_URL;
  todos: BehaviorSubject<Todo[]> = new BehaviorSubject([] as Todo[]);
  constructor(private http: HttpClient) {
    this.getTodosFromApi();
  }

  get todos$() {
    return this.todos.asObservable();
  }

  getTodosFromApi() {
    this.http.get<Todo[]>(this.URL).subscribe((todos) => {
      this.todos.next(todos);
    });
  }

  postTodo(todo: Todo) {
    return this.http.post<Todo>(this.URL, todo);
  }

  updateTodo(todo: Todo) {
    return this.http.put<Todo>(`${this.URL}/${todo.id}`, todo);
  }

  deleteTodo(todo: Todo) {
    return this.http.delete(`${this.URL}/${todo.id}`);
  }
}
