import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Api} from '../entities/api';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

    constructor(private http: HttpClient) { }
    private apiuri = `${Api.API_URL}comment/`;

    add(data) {
        return this.http.post<any>(`${this.apiuri}add`, data);
    }

    get(id, page = 1) {
        return this.http.get<any>(`${this.apiuri}${id}?page=${page}&time=${new Date().getTime()}`);
    }
    like(id: any) {
        return this.http.get<any>(`${this.apiuri}${id}/like?time=${new Date().getTime()}`);
    }

    dislike(id: any) {
        return this.http.get<any>(`${this.apiuri}${id}/dislike?time=${new Date().getTime()}`);
    }

    delete(id: any) {
        return this.http.get<any>(`${this.apiuri}${id}/delete?time=${new Date().getTime()}`);
    }
}
