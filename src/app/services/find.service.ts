import { Injectable } from '@angular/core';
import {Movie} from '../entities/movie';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Api} from '../entities/api';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FindService {

    constructor(private http: HttpClient) { }
    private apiuri = `${Api.API_URL}find/`;
    all(options) {
        let params = new HttpParams();
        for (const o in options) {
            if (options.hasOwnProperty(o)) {
                params = params.append(o, options[o]);
            }
        }

        return this.http.get<Movie[]>(`${this.apiuri}all`, {params: params});
    }

    recommend(id) {
        return this.http.get<any[]>(`${this.apiuri}recommend/${id}`);
    }

    search(query: Observable<string>, limit): Observable<Movie[]> {
        return this.http.get<Movie[]>(`${this.apiuri}search?query=${query}&limit=${limit}`);
    }

}
