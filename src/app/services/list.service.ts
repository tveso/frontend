import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Api} from '../entities/api';
import {Movie} from '../entities/movie';
import {Observable} from 'rxjs';
import {List} from '../entities/list';

@Injectable({
  providedIn: 'root'
})
export class ListService {

    constructor(private http: HttpClient) { }
    private apiuri = `${Api.API_URL}list/`;

    get(id: String): Observable<any> {
        return this.http.get<List>(`${this.apiuri}${id}`);
    }

    all(params: any) {
        return this.http.get<List[]>(`${this.apiuri}all`, {params: params});
    }
    movies(id, params: any): Observable<Movie[]> {
        return this.http.get<Movie[]>(`${this.apiuri}${id}/movies`, {params: params});
    }

    edit(list: List) {
        return this.http.post<List[]>(`${this.apiuri}edit`, list);
    }
    create(list: List): Observable<List> {
        return this.http.post<List>(`${this.apiuri}create`, list);
    }

    tvshows(id: string, params: any) {
        return this.http.get<Movie[]>(`${this.apiuri}${id}/tvshows`, {params: params});
    }
}
