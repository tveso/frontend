import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Movie} from '../../entities/movie';
import {concat, forkJoin, merge, Observable, of} from 'rxjs';
import {MoviesService} from '../../services/movies.service';
import {concatMap, concatMapTo, map, mergeMap, zip} from 'rxjs/operators';
import {TvshowService} from '../../services/tvshow.service';
import {SecurityService} from '../../services/security.service';

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
            return forkJoin(this.tvshowService.upcoming(), this.movieService.getPopularMovies(), this.movieService.getUpcomingMovies())
                .pipe(map((data) => {
                    return {'popularmovies' : data[1], 'upcomingtv': data[0], 'upcomingmovies': data[2]};
                }), );

    }
}



export {PopularResolver};
