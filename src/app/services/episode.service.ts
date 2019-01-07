import { Injectable } from '@angular/core';
import {Api} from '../entities/api';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {
    private apiuri = `${Api.API_URL}episodes/`;
    constructor(private http: HttpClient) { }

    getById(id: any) {
        return this.http.get(`${this.apiuri}${id}`);
    }
}
