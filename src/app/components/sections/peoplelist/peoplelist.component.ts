import {Component, Input, OnInit} from '@angular/core';
import {PeopleService} from '../../../services/people.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-peoplelist',
    templateUrl: './peoplelist.component.html',
    styleUrls: ['./peoplelist.component.css']
})
export class PeoplelistComponent implements OnInit {
    public changiParams = false;
    public showFilters = false;
    public noMoreLoad = false;
    public people: any = [];
    public loadingPeople = false;
    @Input() params: any = {page: 1, sort: 'popularity'};
    birthPlaces = [];
    control = new FormControl();
    private firstLoad = false;
    private birthPlaces$: Observable<any>;

    constructor(private peopleService: PeopleService, private activatedRouter: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this.activatedRouter.queryParams.subscribe((data) => {
                data = this.fixData(data);
                this.params = {...this.params, ...data};
                if (this.params.page <= 1) {
                    this.changiParams = true;
                }
                this.peopleService.all(this.params).subscribe((people) => {
                    if (people.length === 0) {
                        this.noMoreLoad = true;
                    }
                    this.firstLoad = true;
                    this.changiParams = false;
                    if (this.params.page > 1) {
                        this.people = Array.from(new Set(this.people.concat(people)));
                    } else {
                        this.people = Array.from(new Set(people));
                    }
                    this.loadingPeople = false;
                }, (err) => {
                    this.loadingPeople = false;
                });
            }
        );
        this.birthPlaces$ = this.control.valueChanges;
        this.birthPlaces$.pipe(debounceTime(150),
            switchMap((value) => {
                this.birthPlaces = [];
                if (typeof value === 'undefined' || value.length === 0) {
                    this.birthPlaces = [];
                    return [];
                }
                return this.peopleService.getBirthPlaces(value);
            })).subscribe((a) => {
            this.birthPlaces = a;
        });
    }

    getPeople() {
        if (!this.loadingPeople && this.noMoreLoad === false) {
            this.loadingPeople = true;
            this.params.page = Number(this.params.page) + 1;
            this.updateUri();
        }
    }

    fixparams() {
        for (const i in this.params) {
            const actual = this.params[i];
            if (typeof actual === 'undefined' || actual === 'undefined' || actual === '') {
                delete this.params[i];
            }
        }
    }

    displayFn(name) {
        return name;
    }

    rangeArray(num) {
        const result = [];
        for (let i = 0; i <= num; i++) {
            result.push(num);
        }
        return result;
    }

    filterPeople() {
        if (!this.loadingPeople) {
            this.params.page = 1;
            this.people = [];
            this.loadingPeople = true;
            this.updateUri();
        }
    }

    private updateUri() {
        this.fixparams();
        this.router.navigate([], {queryParams: this.params});
    }

    private fixData(data: Params) {
        const result = {};
        for (const i in data) {
            if (data.hasOwnProperty(i)) {
                let actual = data[i];
                if (i === 'gender') {
                    actual = String(actual);
                    result[i] = actual.split(',');
                } else {
                    result[i] = actual;
                }
            }
        }
        return result;
    }
}
