import { User } from './../models/user';
import { AuthenticationService } from './../services/authentication.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
) { }
private currentUser: User | null = this.authenticationService.currentUserValue

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.currentUser) {
        if (new Date(this.currentUser.exp * 1000) < new Date) {
            this.authenticationService.logout()
        }
        return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
    return false;
}

checkTokenExpiration() {
    if (this.currentUser) {
        if (new Date(this.currentUser.exp * 1000) < new Date) {
            return false;
        }
        else {
            return true;
        }
    }
    else {
        return true;
    }
}

canLoad() {
    return this.checkTokenExpiration()
}
}
