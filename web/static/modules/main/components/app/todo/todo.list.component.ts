import { Component, Input, OnInit, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { Todo } from '../../../models/todo';

import { ApiService } from '../../../support/services';

@Component({
  selector: 'todo-list-component',
  styles: [ require('./todo.list.component.scss') ],
  template: `
  <div class="list-container">

    <ul>
        <li *ngFor="let task of tasks" class="list-tasks">
        <!--span [ngStyle]="task.status === 'done' ? 'color:red; text-decoration:line-through' : 'color:black'">{{ task.task }}</span-->
        <span *ngIf="task.status !== 'done'">
            {{ task.task }}
        </span>
        <span *ngIf="task.status === 'done'">
            <span style="text-decoration:line-through;">{{ task.task }}</span>
        </span>
        <button class="btn btn-default pull-right" (click)="deleteTask(task.id)">X</button>
        <span *ngIf="task.status !== 'done'">
            <button class="btn btn-default pull-right btn-done" (click)="updateTaskStatus(task.id, 'done')">Done</button>
        </span>
        <span *ngIf="task.status === 'done'">
            <button class="btn btn-default pull-right btn-done" (click)="updateTaskStatus(task.id, 'undone')">Undone</button>
        </span>
        </li>
    </ul>
  </div>
  `,
})
export class TodoListComponent implements OnInit, OnChanges {

    @Input() trigger: string = "";
    tasks: Todo[];

    constructor( private apiService: ApiService ) {
    }

    loadTodo(): void {
        this.apiService.getTodosRest().subscribe(
        tasks => {
            this.tasks = tasks.data.get_todos;
        },
        error => {
            console.log(error);
        });
    }

    ngOnInit(): void {
        this.loadTodo();
    }

    ngOnChanges(): void {
        this.loadTodo();
    }

    updateTaskStatus(task_id: number, status: string): void {
        console.log("updateTaskStatus, task_id: " + task_id + ", status: " + status);
        this.apiService.updateTodo(task_id, status).subscribe(
            task => {
                console.log(task);
            },
            err => {
                console.log(err);
            }
        );
    }

    deleteTask(task_id: number): void {
        this.apiService.removeTodo(task_id).subscribe(
            task => {
                task;
            },
            err => {
                console.log(err);
            }
        );
    }
}