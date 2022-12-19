import {
  Component,
  OnInit,
} from '@angular/core';
import { TodoService } from 'src/app/modules/todo/services/todo.service';
import { FilterOption } from 'src/app/modules/todo/shared/filter-option';
@Component({
  selector: 'app-filter-todo',
  templateUrl: './filter-todo.component.html',
  styleUrls: ['./filter-todo.component.scss'],
})
export class FilterTodoComponent implements OnInit {

  FilterOption = FilterOption;
  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {}

  onRadioChange(option: FilterOption) {
    this.todoService.setFilter(option);
  }
}
