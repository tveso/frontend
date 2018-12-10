import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {SecurityService} from '../services/security.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private securityService: SecurityService, private router: Router) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const data = next.data;
        const roles = data.needAuth;
        const url = state.url;
        const hasAccess = this.securityService.hasAccess(roles);
        const isLoginUrl = url.indexOf('/login') > -1;
        const isRegisterUrl = url.indexOf('/register') >- 1;
        const isLoggedIn = this.securityService.loggedIn();
        if (!isLoggedIn) {
            if (!isLoginUrl) {
                this.router.navigate(['/login']);
                return true;
            }
            return true;
        }
        if (hasAccess && !(isLoginUrl || isRegisterUrl)) {
            return true;
        }
        this.router.navigate(['/home']);

        return false;
    }
}
