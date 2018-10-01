import { Injectable } from '@angular/core';
import {Api} from '../entities/api';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
    private apiuri = `${Api.API_URL}follow/`;
  constructor(private http: HttpClient) { }

    follow(id, type) {
        return this.http.get<any[]>(`${this.apiuri}${id}?type=${type}`);
    }
}
