import { Component, EventEmitter, Output } from '@angular/core';
import { Credentials } from './credentials';
import { User } from '../../../models/user';
import { ApiService } from '../../../support/services';

@Component({
  selector: 'login-form-component',
  styles: [ require('./login.form.component.scss') ],
  template: `
  <div class="form-container">
    Demo user: <strong>demo@example.com</strong><br />
    password: <strong>foo</strong>

    <form #loginForm="ngForm" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <input type="email" class="form-control" placeholder="Email" required
          [(ngModel)]="model.email"
          ngControl="email" name="email">
        <input type="password" class="form-control" placeholder="Password" required
          [(ngModel)]="model.password"
          ngControl="password" name="password">
      </div>
      <button type="submit" class="btn btn-default"
        [disabled]="!loginForm.form.valid">Submit</button>
    </form>
  </div>
  <div class="message">{{message}}</div>
  `,
})
export class LoginFormComponent {
  @Output() onSuccess: EventEmitter<User> = new EventEmitter<User>();

  constructor( private apiService: ApiService ) {}

  model = new Credentials();
  submitted = false;
  message = null;
  onSubmit() {
    this.message = null;
    this.submitted = true;
    this.apiService.login(this.model.email, this.model.password).subscribe(
      user => this.onSuccess.emit(user),
      error => {
        this.message = 'Please try again';
      }
    );
  }
}
