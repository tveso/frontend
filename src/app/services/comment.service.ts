import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Api} from '../entities/api';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

    constructor(private http: HttpClient) { }
    private apiuri = `${Api.API_URL}comment/`;

    add(data) {
        return this.http.post<any[]>(`${this.apiuri}add`, data);
    }

    get(id) {
        return this.http.get<any[]>(`${this.apiuri}${id}`);
    }
}
