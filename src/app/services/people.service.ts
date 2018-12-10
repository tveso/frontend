import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Api} from '../entities/api';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

    private apiuri = `${Api.API_URL}people/`;
    constructor(private http: HttpClient) {
        this.http = http;
    }

    all(options): Observable<any[]> {
        let params = new HttpParams();
        for (const o in options) {
            if (options.hasOwnProperty(o)) {
                params = params.append(o, options[o]);
            }
        }
        return this.http.get<any[]>(`${this.apiuri}all`, {params: params});
    }

    getBirthPlaces(search): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiuri}search/birthplace?query=${search}`);
    }

    getById(id: any) {
        return this.http.get<any[]>(`${this.apiuri}${id}`);
    }

    getShowsByPerson(id: any, options) {
        let params = new HttpParams();
        for (const o in options) {
            if (options.hasOwnProperty(o)) {
                params = params.append(o, options[o]);
            }
        }
        return this.http.get<any[]>(`${this.apiuri}${id}/shows`, {params: params});
    }
}

