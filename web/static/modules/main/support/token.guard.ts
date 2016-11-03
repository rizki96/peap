import { Injectable } from '@angular/core';
import { CanActivate,
         ActivatedRoute,
         Router,
         ActivatedRouteSnapshot,
         RouterStateSnapshot } from '@angular/router';
import { URLSearchParams } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { ApiService, LocalStorage } from './services';

@Injectable()
export class TokenGuard implements CanActivate {

  private returnUrl: string;

  constructor(private router: Router, private apiService: ApiService,
    private localStorageService: LocalStorage, private route: ActivatedRoute) {}

  canActivate(next:  ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    let token = this.localStorageService.get('token');
    let params = new URLSearchParams(state.url);
    this.returnUrl = params.getAll("/login?returnUrl")[0];

    if (token) {
      return this.apiService.loginWithToken(token).map(
        user => this.onSuccessFullLogin(),
        err => true
      );
    } else {
      return true;
    }
  }

  onSuccessFullLogin(): boolean {
    //let returnUrl = this.route.snapshot.params['returnUrl'];
    let returnUrl = this.returnUrl;

    if (returnUrl) {
      let decodedReturnUrl = decodeURIComponent(returnUrl);
      this.router.navigateByUrl(decodedReturnUrl);
    } else {
      this.router.navigateByUrl('/dashboard');
    }
    return false;
  }

}
