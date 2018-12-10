import { Injectable } from '@angular/core';
import {Api} from '../entities/api';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {
    private apiuri = `${Api.API_URL}main/`;
    constructor(private http: HttpClient) {
        this.http = http;
    }

    public all(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiuri}all`);
    }

}
