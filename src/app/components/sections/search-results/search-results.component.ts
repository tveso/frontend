import {Component, Injectable, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Movie} from '../../../entities/movie';
import {FindService} from '../../../services/find.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
    query: any;
    results: Movie[] = [];

  constructor(private activatedRouter: ActivatedRoute, private findService: FindService) {
  }

  ngOnInit() {
      this.activatedRouter.data.subscribe((a) => {
          this.results = a['results'];
      });
      this.activatedRouter.queryParams.subscribe((data) => {
          this.query = data.query;
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

    getPeople() {
        return this.results.filter((data) => {
            return data.type === 'person';
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
        return this.findService.search(route.queryParams.query, 30, true);
    }
}

