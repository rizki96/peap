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
            <div class="navbar-header">
                <a class="navbar-brand" href="#">Data Editor</a>
                <!--div class="page-header"-->
                    <div *ngIf="userInfo" id="navbar" class="">
                        <!--ul class="nav navbar-nav">
                            <li><a href="#">About</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul-->
                        <!--ul class="nav navbar-nav navbar-right pull-right">
                            <li><div class="">Welcome, {{userInfo.name}} ({{userInfo.email}})</div></li>
                            <li><a href="javascript:void(0)" class="btn btn-link" (click)="logout()">Logout</a></li>
                        </ul-->
                        <div class="controls">
                            <div class="pull-right">
                                <a href="javascript:void(0)" class="btn btn-link" (click)="logout()">Logout</a>
                            </div>
                            <div class="pull-right">Welcome, {{userInfo.name}} ({{userInfo.email}})</div>
                        </div>
                    </div>
                <!--/div-->
            </div>
            </div>
        </nav>
    `
})

export class MenubarComponent implements OnInit, OnChanges {

    @Input() userInfo;

    constructor(private apiService: ApiService,
                private eventService: EventService,
                private router: Router) {
    }

    ngOnInit(): void {
        console.log('ngOnInitMenubar');
    }

    ngOnChanges(): void {
        console.log('ngOnChangesMenubar, userInfo: ');
        console.log(this.userInfo);
    }

    showNonLoginMenubar(): void {

    }

    showHasLoginMenubar(): void {

    }

    logout(): void {
        this.userInfo = null;
        this.apiService.logout();
        this.router.navigateByUrl('/login');
    }

}
