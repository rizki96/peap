import { 
    Component,
    Input,
    OnInit, OnChanges,
    ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

//import { User } from '../../../models/user';
import { ApiService, EventService } from '../../../support/services';
import { AuthGuard } from '../../../support/guards';

@Component({
    selector: 'menubar-component',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [],
    template: `
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Data Editor</a>
                <div class="navbar-header navbar-right">
                    <ul class="nav navbar-nav pull-right" *ngIf="userInfo">
                        <li><a href="javascript:void(0)">Welcome, {{userInfo.name}} ({{userInfo.email}})</a></li>
                        <li><a href="javascript:void(0)" class="btn btn-link" (click)="logout()">Logout</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <tabset *ngIf="userInfo">
            <tab *ngFor="let tb of tabNames" 
                (select)="onTabSelect(tb)" 
                [heading]="tb.title"
                [active]="tb.active"
                (select)="tb.active = true"
                (deselect)="tb.active = false"
            >
                <div>
                    <p style="margin-top:20px;">
                    </p>
                </div>
            </tab>
        </tabset>
    `
})

export class MenubarComponent implements OnInit, OnChanges {

    @Input() userInfo;
    public tabNames: Array<any> = [
        {name: 'dashboard', title: 'Dashboard'},
        {name: 'todo', title: 'Todo List'}
    ];

    constructor(private apiService: ApiService,
                private eventService: EventService,
                private router: Router) {
    }

    public setActiveTab(index: number): void {
        this.tabNames[index].active = true;
    };

    ngOnInit(): void {
        console.log('ngOnInitMenubar');
        this.eventService.pageIndex.subscribe(
            (idx) => this.setActiveTab(idx)
        );
    }

    ngOnChanges(): void {
        console.log('ngOnChangesMenubar, userInfo: ');
        console.log(this.userInfo);
    }

    logout(): void {
        this.userInfo = null;
        this.apiService.logout();
        this.router.navigateByUrl('/login');
    }

    onTabSelect(currentTab: any): void {
        this.router.navigateByUrl('/' + currentTab.name);
    }

}
