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
        if (typeof roles === 'undefined') {
            if (url === '/login' && this.securityService.loggedIn()) {
                this.router.navigate(['/home']);
                return false;
            }
            return true;
        }
        const result = this.securityService.hasAccess(roles);
        if (result === false) {
            this.router.navigate(['/login']);
        }
        return result;
    }
}
