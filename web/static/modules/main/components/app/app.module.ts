import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login/login.form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TodoComponent } from './todo/todo.component';
import { TodoFormComponent } from './todo/todo.form.component';
import { TodoListComponent } from './todo/todo.list.component';
import { MenubarComponent } from './menubar/menubar.component';
import { APP_GUARD_PROVIDERS } from '../../support/guards';
import { APP_SERVICE_PROVIDERS } from '../../support/services';
import { routes } from './app.routes';

@NgModule({
    imports: [
      BrowserModule,
      RouterModule.forRoot(routes),
      FormsModule,
      HttpModule,
      Ng2BootstrapModule
    ],
    declarations: [
      AppComponent,
      LoginComponent,  // this should probably be a NgModule
      LoginFormComponent,  // methinks this should be part of the LoginModule
      DashboardComponent,  // this should probably be a NgModule
      TodoComponent,
      TodoFormComponent,
      TodoListComponent,
      MenubarComponent
    ],
    providers: [
      APP_GUARD_PROVIDERS,
      APP_SERVICE_PROVIDERS
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
