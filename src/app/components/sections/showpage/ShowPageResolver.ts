import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Movie} from '../../../entities/movie';
import {Observable} from 'rxjs';
import {TvshowService} from '../../../services/tvshow.service';
import {MoviesService} from '../../../services/movies.service';

@Injectable()
class TvShowInfoPageResolver implements Resolve<Movie> {
    constructor(private tvshowService: TvshowService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        return this.tvshowService.getById(route.params.id);
    }
}

@Injectable()
class MovieInfoPageResolver implements Resolve<Movie> {
    constructor(private movieService: MoviesService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        return this.movieService.getById(route.params.id);
    }
}

export { TvShowInfoPageResolver, MovieInfoPageResolver};