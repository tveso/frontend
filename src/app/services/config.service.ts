import { Injectable } from '@angular/core';
import {Movie} from '../entities/movie';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Api} from '../entities/api';
import {Observable, Subject} from 'rxjs';
import {SecurityService} from './security.service';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    private genres: any;
    private _config = new Subject<any>();
    constructor(private http: HttpClient, private securityService: SecurityService) { }
    private apiuri = `${Api.API_URL}config/`;

    init() {
        let finished = 0;
        const numObservables = 2;
        const checkDone = () => {
            if (finished === numObservables) {
                this._config.complete();
            }
        };
        this.getGenresResources().subscribe((a) => {
            this.genres = a;
            finished  += 1;
            checkDone();
        });
        this.securityService.checkAuth().subscribe((a) => {
            finished  += 1;
            checkDone();
        });
        return this._config.asObservable();

    }
    getGenresResources() {
        return this.http.get(`${this.apiuri}genres`);
    }

    getGenres(type: any = null) {
        if (type !== null && this.genres instanceof Array) {
            return this.genres.filter((a) => {
                return a.type === type;
            });
        }
        return this.genres;
    }

}
