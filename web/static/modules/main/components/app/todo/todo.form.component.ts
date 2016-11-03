import { Component, EventEmitter, Output } from '@angular/core';
import { Todo } from '../../../models/todo';
import { ApiService } from '../../../support/services';

@Component({
  selector: 'todo-form-component',
  styles: [ require('./todo.form.component.scss') ],
  template: `
  <div class="form-container">
    <form #todoForm="ngForm" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <input type="task" class="form-control" placeholder="Task name" required
          [(ngModel)]="model.task"
          ngControl="task" name="task">
      </div>
      <button type="submit" class="btn btn-default">Submit</button>
    </form>
  </div>
  <div class="message">{{message}}</div>
  `,
})
export class TodoFormComponent {
  @Output() onSuccess = new EventEmitter();

  constructor( private apiService: ApiService ) {}

  model = new Todo(null, "", "");
  submitted = false;
  message = null;
  onSubmit() {
    this.message = null;
    this.submitted = true;
    this.apiService.addTodo(this.model.task, this.model.status).subscribe(
        task => {
            this.model = new Todo(null, "", "");
            this.onSuccess.emit(task);
        },
        error => {
            this.message = 'Please try again';
        }
    );
  }
}