import { Injectable } from '@angular/core';
import { HttpClient,  HttpParams } from '@angular/common/http';
import {Movie} from '../entities/movie';
import {Observable, Subject} from 'rxjs';
import {Api} from '../entities/api';



@Injectable({
  providedIn: 'root'
})
export class MoviesService {
    private apiuri = `${Api.API_URL}movies/`;
  constructor(private http: HttpClient) {
    this.http = http;
  }

  getPopularMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiuri}popular`);
  }

    getUpcomingMovies() {
        return this.http.get<Movie[]>(`${this.apiuri}upcoming`);
    }

    search(query: Observable<string>, limit): Observable<Movie[]> {
        return this.http.get<Movie[]>(`${this.apiuri}search?query=${query}&limit=${limit}`);
    }

    getById(id: string | null) {
        return this.http.get<Movie>(`${this.apiuri}${id}`);
    }
    getRelated(id: any): Observable<Movie[]> {
        return this.http.get<Movie[]>(`${this.apiuri}${id}/related`);
  }

    getRecommended(id: any): Observable<Movie[]> {
        return this.http.get<Movie[]>(`${this.apiuri}${id}/recommended`);
    }
    getDummyMovies(number): Movie[] {
        const result = Array<Movie>();
        for (let i = 0; i < number; i++) {
            result.push(new Movie);
        }
        return result;
    }

}
