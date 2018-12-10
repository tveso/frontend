import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Api} from '../entities/api';
import {Movie} from '../entities/movie';
import {CacheProxyService} from './cache-proxy.service';

@Injectable({
    providedIn: 'root'
})
export class RecommendatorService {

    constructor(private http: HttpClient, private cacheProxyService: CacheProxyService) { }
    private apiuri = `${Api.API_URL}recommend/`;

    byShow(id, page = 1) {
        const key = `${this.apiuri}${id}?page=${page}`;
        return this.cacheProxyService.proxy(key,
            this.http.get<any>(key));
    }

    getRecommendedUser(page = 1) {
        return this.http.get<any>(`${this.apiuri}user?page=${page}`);
    }

    byQuery(query: any) {
        let params = new HttpParams();
        for (const o in query) {
            if (query.hasOwnProperty(o)) {
                params = params.append(o, query[o]);
            }
        }
        return this.http.get<any>(`${this.apiuri}query`, {params: params});
    }
}
