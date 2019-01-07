import {Injectable} from '@angular/core';
import {Movie} from '../entities/movie';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Api} from '../entities/api';
import {Observable} from 'rxjs';
import {CacheProxyService} from './cache-proxy.service';

@Injectable({
    providedIn: 'root'
})
export class FindService {

    constructor(private http: HttpClient, private cacheProxyService: CacheProxyService) { }
    private apiuri = `${Api.API_URL}find/`;
    all(options): Observable<any> {
        let params = new HttpParams();
        for (const o in options) {
            if (options.hasOwnProperty(o)) {
                params = params.append(o, options[o]);
            }
        }
        const key = `${this.apiuri}all` + JSON.stringify(params);
        return this.cacheProxyService.proxy(key,
            this.http.get<Movie[]>(`${this.apiuri}all`, {params: params}));
    }


    search(query: Observable<string>, limit, full = false): Observable<any> | (() => Observable<any>) {
            return this.http.get<Movie[]>(`${this.apiuri}search?query=${query}&limit=${limit}&full=${full}`);
    }

}
