import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Movie} from '../../../entities/movie';
import {Observable} from 'rxjs';
import {MoviesService} from '../../../services/movies.service';

@Injectable()
class MovieInfoPageResolver implements Resolve<Movie> {
    constructor(private movieService: MoviesService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any>|Promise<any>|any {
        return this.movieService.getById(route.params.id);
    }
}

export {  MovieInfoPageResolver};