import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Api} from '../entities/api';
import {Movie} from '../entities/movie';
import {Observable, Subject} from 'rxjs';
import {List} from '../entities/list';

@Injectable({
  providedIn: 'root'
})
export class ListService {
    changes$ = new Subject();

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

    edit(id, list: List) {
        return this.http.post<List>(`${this.apiuri}${id}/edit`, list);
    }
    create(list: List): Observable<List> {
        return this.http.post<List>(`${this.apiuri}create`, list);
    }

    tvshows(id: string, params: any) {
        return this.http.get<Movie[]>(`${this.apiuri}${id}/tvshows`, {params: params});
    }
    people(id: string, params: any) {
        return this.http.get<any[]>(`${this.apiuri}${id}/people`, {params: params});
    }
    episodes(id: string, params: any) {
        return this.http.get<any[]>(`${this.apiuri}${id}/episodes`, {params: params});
    }

    userLists(id, params) {
        return this.http.get<any[]>(`${this.apiuri}user/${id}`, {params: params});
    }

    addToList(id, params: any) {
        return this.http.get<any[]>(`${this.apiuri}${id}/add`, {params: params});
    }

    delete(id: string) {
        return this.http.get<Movie[]>(`${this.apiuri}${id}/delete`);
    }
}
