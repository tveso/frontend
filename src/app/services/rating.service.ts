import {Injectable} from '@angular/core';
import {Api} from '../entities/api';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

    private apiuri = `${Api.API_URL}rating/`;
    constructor(private http: HttpClient) {
        this.http = http;
    }
    rate(obj) {
        return this.http.post<any>(`${this.apiuri}rate`, obj);
    }
}
