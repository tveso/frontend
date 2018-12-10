import { Injectable } from '@angular/core';
import {Movie} from '../entities/movie';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Api} from '../entities/api';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TvshowService {

  constructor(private http: HttpClient) { }
    private apiuri = `${Api.API_URL}tvshows`;

    getById(id: string | null) {
        return this.http.get<Movie>(`${this.apiuri}/${id}`);
    }

    update(season_number: any, _id: string) {
        return this.http.get<Movie>(`${this.apiuri}/${_id}/update/${season_number}`);
    }

    getSeasonEpisodes(id, seasonNumber): Observable<any> {
        return this.http.get<any>(`${this.apiuri}/${id}/episodes?season=${seasonNumber}`);
    }

    popular(): Observable<any> {
        return this.http.get<Movie>(`${this.apiuri}/popular`);
    }

    upcoming(): Observable<any> {
        return this.http.get<Movie>(`${this.apiuri}/upcoming`);
    }
}
