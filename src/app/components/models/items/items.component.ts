import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfigService} from '../../../services/config.service';
import {Observable, Subject} from 'rxjs';



export class Filters {
    showSort = false;
    peopleSort = false;
    genres = false;
    durationMovie = false;
    releasedShows = false;
    durationTvShow = false;
    userTv = false;
    userMovie = false;
    search = false;
    famous = false;
    textSearch = false;
    patternSearch = false;
    tvOrMovie = false;
    years = false;
    maxSeasonNumber = false;
    gender = false;
    placeOfBirth = false;
}

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  @Input() filters: Filters = new Filters();
  @Input() params: any = {page: 1};
  changiParams;
  @Input() options = {};
  @Input() changeQueryParams = false;
  @Input() itemCallback: Function;
  items = [];
  @Input() update = new Subject<any>();
  @Input() type;
  @Input() loadItemsCallback;
  @Output() paramsOutput: EventEmitter<any> = new EventEmitter<any>();
  @Input() extraDataFn: Function;
  multiples = ['gender', 'genres', 'year', 'mode'];
  @Input() filteredFn;
  firstLoad = false;
  loading = false;
  showFilters = false;
  @Input() public noMoreData  = false;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, public configService: ConfigService) { }

  ngOnInit() {
      this.params = {...this.params, ...this.options};
      if (this.changeQueryParams === true) {
          this.activatedRoute.queryParams.subscribe((a) => {
              this.params = {...this.params, ...a};
              this.params = this.fixParams(this.params, a);
              if ((!this.firstLoad && !this.loading)) {
                  this.load();
              }
              if (a.filter === 'true') {
                  this.filter();
              }
          });
      } else {
          this.load();
      }
      this.update.asObservable().subscribe((a) => {
          console.log(a);
            this[a.callback](a.resource);
      });
  }
  delete(item: any) {
      const index = this.items.indexOf(item);
      if (index > -1) {
          this.items.splice(index, 1);
      }
  }
  add(item: any) {
      this.items.push(item);
  }

    purgeIfFalse(param) {
        if (this.params[param]) {
            this.params[param] = true;
        } else {
            delete this.params[param];
        }
        this.filter();
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

    public load() {
      const observer = this.loadItemsCallback(this.params);
        this.loading = true;
        this.paramsOutput.emit(this.params);
      if (observer instanceof Observable) {
          observer.subscribe((a) => {
              this.loading = false;
              this.firstLoad = true;
              if (this.changeQueryParams === true) {
                  this.updateUri();
              }
              if (a.length < 30 ) {
                  this.items = Array.from(new Set(this.items.concat(a)));
                  this.noMoreData = true;
                  return;
              }
              this.items = Array.from(new Set(this.items.concat(a)));
          });
      }
    }

    public loadMoreItems() {
      if (this.loading === true) {
          return;
      }
      this.params.page = Number(this.params.page) + 1;
      this.load();
    }

    public filter() {
      this.params.page = 1;
      this.firstLoad = false;
      this.noMoreData = false;
      this.items = [];
      this.fixParams(this.params, null);
      this.load();
    }

    resetFilters() {
        this.params = {page: 1, sort: 'popularity'};
        this.params = {...this.params, ...this.options};
        this.firstLoad = false;
        this.noMoreData = false;
        this.items = [];
        this.fixParams(this.params, null);
        this.load();
    }

    private fixParams(params: any, data: any) {
        for (const param in params) {
            if (params.hasOwnProperty(param)) {
                if (typeof params[param] === 'undefined' || params[param] === 'undefined' || params[param] === '') {
                    delete params[param];
                    continue;
                }
                if ((params[param] instanceof Array) === false && this.multiples.indexOf(param) > -1) {
                    params[param] = [params[param]];
                }
                if (params[param] instanceof Array && params[param].length === 0 ) {
                    delete params[param];
                }
            }
        }
        delete params.filter;
        params.page = Number(params.page);
        return params;
    }

    private updateUri() {
        this.fixParams(this.params, []);
        this.router.navigate([], {queryParams: this.params});
    }
}

