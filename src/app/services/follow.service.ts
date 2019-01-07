import { Injectable } from '@angular/core';
import {Api} from '../entities/api';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
    private apiuri = `${Api.API_URL}follow/`;
  constructor(private http: HttpClient) { }

    follow(id, type, resourceType) {
      if (!(typeof id === 'string')) {
          if ('$oid' in id) {
              id = id.$oid;
          }
      }
        return this.http.get<any[]>(`${this.apiuri}${id}?type=${type}&resourceType=${resourceType}`);
    }
    all(options: Array<any> = []) {
        let params = new HttpParams();
        for (const o in options) {
            if (options.hasOwnProperty(o)) {
                params = params.append(o, options[o]);
            }
        }
        return this.http.get<any[]>(`${this.apiuri}find`, {params: params});
    }
    watchEpisode(id, cancel = false, previous = false) {
        return this.http.get<any[]>(`${this.apiuri}episode?episode=${id}&previousEpisodes=${previous}&cancel=${cancel}`);
    }
}
