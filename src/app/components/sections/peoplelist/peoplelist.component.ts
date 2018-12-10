import {Component, Input, OnInit} from '@angular/core';
import {PeopleService} from '../../../services/people.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, switchMap} from 'rxjs/operators';
import {ConfigService} from '../../../services/config.service';
import {FindService} from '../../../services/find.service';

@Component({
    selector: 'app-peoplelist',
    templateUrl: './peoplelist.component.html',
    styleUrls: ['./peoplelist.component.scss']
})
export class PeoplelistComponent implements OnInit {
    @Input() params: any = {page: 1, genres: [], sort: 'popularity', released_shows: true};
    public callback: any;

    constructor(protected peopleService: PeopleService) {
    }

    ngOnInit() {
        this.callback = this.load.bind(this);
    }

    load(params) {
        delete params['type'];
        return this.peopleService.all(params);
    }
}
