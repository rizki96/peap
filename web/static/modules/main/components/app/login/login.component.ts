import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, EventService } from '../../../support/services';

@Component({
  selector: 'login-component',
  styles: [ require('./login.component.scss') ],
  template: `
    <login-form-component (onSuccess)="onSuccessFullLogin($event)"></login-form-component>
  `
})
export class LoginComponent {

  constructor( private apiService: ApiService,
              private eventService: EventService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  onSuccessFullLogin(user) {
    let returnUrl = this.route.snapshot.params['returnUrl'];

    this.eventService.userInfo.emit(user);
    if (returnUrl) {
      let decodedReturnUrl = decodeURIComponent(returnUrl);
      this.router.navigateByUrl(decodedReturnUrl);
    } else {
      this.router.navigateByUrl('/dashboard');
    }
  }
}
