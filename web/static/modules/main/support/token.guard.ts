import { Injectable } from '@angular/core';
import { CanActivate,
         ActivatedRoute,
         Router,
         ActivatedRouteSnapshot,
         RouterStateSnapshot } from '@angular/router';
import { URLSearchParams } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { ApiService, LocalStorage, EventService } from './services';

@Injectable()
export class TokenGuard implements CanActivate {

  private returnUrl: string;

  constructor(private router: Router, private apiService: ApiService,
    private localStorageService: LocalStorage, private eventService: EventService,
    private route: ActivatedRoute) {}

  canActivate(next:  ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    let token = this.localStorageService.get('token');
    let params = new URLSearchParams(state.url);
    this.returnUrl = params.getAll("/login?returnUrl")[0];

    if (token) {
      return this.apiService.loginWithToken(token).map(
        user => this.onSuccessFullLogin(user),
        err => true
      );
    } else {
      return true;
    }
  }

  onSuccessFullLogin(user: User): boolean {
    //let returnUrl = this.route.snapshot.params['returnUrl'];
    let returnUrl = this.returnUrl;

    this.eventService.userInfo.emit(user);
    if (returnUrl) {
      let decodedReturnUrl = decodeURIComponent(returnUrl);
      this.router.navigateByUrl(decodedReturnUrl);
    } else {
      this.router.navigateByUrl('/dashboard');
    }
    return false;
  }

}
