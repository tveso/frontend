import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Movie} from '../../../entities/movie';
import {forkJoin, Observable, of} from 'rxjs';
import {MoviesService} from '../../../services/movies.service';
import {map} from 'rxjs/operators';
import {TvshowService} from '../../../services/tvshow.service';
import {SecurityService} from '../../../services/security.service';

@Injectable()
class PopularResolver implements Resolve<Movie> {
    constructor(private movieService: MoviesService, private tvshowService: TvshowService, private securityService: SecurityService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any>|Promise<any>|any {
        if (!this.securityService.loggedIn()) {
            return of([false]);
        }
        return forkJoin(this.tvshowService.upcoming())
                .pipe(map((data) => {
                    return {'upcomingtv': data[0]};
                }), );

    }
}



export {PopularResolver};
