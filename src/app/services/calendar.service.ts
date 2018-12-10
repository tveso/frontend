import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Api} from '../entities/api';
import {Movie} from '../entities/movie';
import {Observable} from 'rxjs';

export class CalendarServiceParams {
  include_movies?: Number;
  include_tvshows?: Number;
  only_user_followed?: Number;
  date?: string;
}
@Injectable({
  providedIn: 'root'
})
export class CalendarService {

    constructor(private http: HttpClient) { }
    private apiuri = `${Api.API_URL}calendar/`;

    bydate(params: CalendarServiceParams): Observable<any> {
        const paramsSended = JSON.parse(JSON.stringify(params));
        return this.http.get<Movie[]>(`${this.apiuri}bydate`, {params: paramsSended});
    }

    getEpisodesBetweenDates(minDate: string, maxDate: string) {
        const paramsSended = {min_date: minDate, max_date: maxDate};
        return this.http.get<Movie[]>(`${this.apiuri}episodes`, {params: paramsSended});
    }
}
