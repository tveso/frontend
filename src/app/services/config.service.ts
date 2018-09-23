import { Injectable } from '@angular/core';
import {Movie} from '../entities/movie';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Api} from '../entities/api';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    private genres: any;

    constructor(private http: HttpClient) { }
    private apiuri = `${Api.API_URL}config/`;

    init() {
        this.http.get(`${this.apiuri}genres`).subscribe((data) => {
            this.genres = data;
        });
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
