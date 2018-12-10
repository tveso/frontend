import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Movie} from '../../../entities/movie';
import {SecurityService} from '../../../services/security.service';
import {Observable, of} from 'rxjs';
import {MainService} from '../../../services/main.service';

@Injectable()
class PopularResolver implements Resolve<Movie> {
    constructor(private mainService: MainService, private securityService: SecurityService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        if (!this.securityService.loggedIn()) {
            return of([false]);
        }
        return this.mainService.all();

    }
}



export {PopularResolver};
