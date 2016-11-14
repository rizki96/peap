import {
  Component,
  OnInit, OnChanges } from '@angular/core';

import { User } from '../../models/user';
import { EventService } from '../../support/services';

@Component({
  selector: 'app-component',
  styles: [ require('./app.component.scss') ],
  template: `
    <menubar-component [userInfo]="userInfo"></menubar-component>
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit, OnChanges {

  menubarType: string;
  userInfo: User;
  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    console.log('ngOnInit');
    this.eventService.userInfo.subscribe(
        (user) => {
            //console.log(user);
            this.userInfo = user;
        }
    );
  }

  ngOnChanges(): void {
    console.log("ngOnChanges");
  }

}
