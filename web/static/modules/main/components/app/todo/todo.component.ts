import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../models/user';

import { ApiService, DataService, SocketService, EventService } from '../../../support/services';

@Component({
  selector: 'todo-component',
  styles: [ require('./todo.component.scss') ],
  template: `
    <div class="main-content">
        <todo-form-component (onSuccess)="onAddedSuccess($event)"></todo-form-component>
    </div>
    <div class="main-content">
        <todo-list-component [trigger]="triggerId"></todo-list-component>
    </div>
  `
})

export class TodoComponent implements OnInit {
    private userName: string;
    private userEmail: string;
    private triggerId: number;

    constructor( private apiService: ApiService, private router: Router,
                private socketService: SocketService, private dataService: DataService,
                private eventService: EventService ) {
    }

    ngOnInit(): void {
        if (this.dataService.authStatus$.getValue() === true) {
            this.setupComponent();
        } else {
            this.dataService.authStatus$.subscribe(status => {
            if (status === true) {
                this.setupComponent();
            } else {
                let currentUrl = this.router.url;
                let returnUrl = encodeURIComponent(currentUrl);
                this.router.navigateByUrl(`/login?returnUrl=${returnUrl}`);
            }
        });
        }
        this.eventService.pageIndex.emit(1);
    }

    setupComponent(): void {
        let user: User = this.apiService.getUser();
        this.userName = user.name;
        this.userEmail = user.email;
        this.dataService.alertMessage$.subscribe(message => {
        (<any>window).alert(message);
        });
        this.dataService.todoId$.subscribe(id => {
            if (this.triggerId !== id)
                this.triggerId = id;
            else
                this.triggerId = 0;
        });
    }

    logout() {
        this.apiService.logout();
        this.router.navigateByUrl('login');
    }

    onAddedSuccess(event: number): void {

    }

};