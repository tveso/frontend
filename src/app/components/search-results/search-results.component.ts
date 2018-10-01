import {Component, Injectable, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {forkJoin, Observable, Subject} from 'rxjs';
import {MoviesService} from '../../services/movies.service';
import {Movie} from '../../entities/movie';
import {TvshowService} from '../../services/tvshow.service';
import {map} from 'rxjs/operators';
import {FindService} from '../../services/find.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
    private query: any;
    results: Movie[];

  constructor(private activatedRouter: ActivatedRoute, private findService: FindService) {
  }

  ngOnInit() {
      this.activatedRouter.queryParams.subscribe((data) => {
          this.query = data.query;
          this.findService.search(this.query, 30).subscribe((data2) => {
              this.results = data2;
          });
      });
  }
  getMovies() {
      if (typeof this.results === 'undefined') {
          return [];
      }
      return this.results.filter((data) => {
          return data.type === 'movie';
      });
  }
    getTvshows() {
        if (typeof this.results === 'undefined') {
            return [];
        }
        return this.results.filter((data) => {
            return data.type === 'tvshow';
        });
    }

}

@Injectable()
export class SearchResultResolver implements Resolve<Movie> {
    constructor(private findService: FindService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any>|Promise<any>|any {
        return this.findService.search(route.queryParams.query, 30);
    }
}

