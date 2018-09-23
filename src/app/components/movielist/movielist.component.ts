import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FindService} from '../../services/find.service';
import {ConfigService} from '../../services/config.service';
import {param} from '../../functions/jquery-param';

@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.css']
})
export class MovielistComponent implements OnInit {
    @Input() movies: any = [];
    @Input() params: any = {page: 1, genres: [], sort: 'popularity'};
    protected type = 'movie';
    protected scrollCallback: any;
    loadingMovies = false;
    changiParams = false;
    showFilters = false;

  constructor(protected findService: FindService, protected router: Router, protected activatedRouter: ActivatedRoute,
              public configService: ConfigService) {
      this.scrollCallback = this.getMovies.bind(this);
  }

  ngOnInit() {
      this.params.type = this.type;
      this.activatedRouter.queryParams.subscribe((data) => {
              this.params = {...this.params, ...data};
              if ( this.params.page <= 1) {
                  this.changiParams = true;
              }
              this.params = this.fixParams(this.params, data);
              this.findService.all(this.params).subscribe((movies) => {
                  this.changiParams = false;
                  if (this.params.page > 1 ) {
                      this.movies = Array.from(new Set(this.movies.concat(movies)));
                  } else {
                      this.movies = Array.from(new Set(movies));
                  }
                  this.loadingMovies = false;
              }, (err) => {
                  this.loadingMovies = false;
              });
          }
      );
  }

  getMovies() {
      if (!this.loadingMovies) {
          this.loadingMovies = true;
          this.params.page = Number(this.params.page) + 1;
          this.updateUri();
      }
  }
  filterMovies() {
      this.params.page = 1;
      this.movies = [];
      this.loadingMovies = true;
      this.updateUri();
    }
    range(min: any, max: any, reverse: boolean = false) {
      let result = [];
        if (max === 'currentYear') {
            max = new Date().getFullYear();
        }
        if (min === 'currentYear') {
            min = new Date().getFullYear();
        }
        for (let i: number = min; i <= max; i ++) {
            result.push(`${i}`);
        }
        if (reverse) {
           result = result.reverse();
        }
        return result;
    }

    private updateUri() {
      this.router.navigate([], {queryParams: this.params});
    }

    changeFamous() {
        if (this.params.famous) {
            this.params.famous = true;
        } else {
            delete this.params.famous;
        }
        this.filterMovies();
    }

    private fixParams(params: any, data: any) {
        for (const param in params) {
            if (params.hasOwnProperty(param)) {
                if (param === 'genres' || param === 'year') {
                    if ((params[param] instanceof Array) === false) {
                        params[param] = [params[param]];
                    }
                }
            }
        }
        params.page = Number(params.page);
        if (typeof data.page === 'undefined') {
            params.page = 1;
        }
        return params;
    }
}
