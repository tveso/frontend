import { Injectable } from '@angular/core';
import { HttpClient,  HttpParams } from '@angular/common/http';
import {Movie} from '../entities/movie';
import {Observable, Subject} from 'rxjs';
import {Api} from '../entities/api';



@Injectable({
  providedIn: 'root'
})
export class LinkService {
    private apiuri = `${Api.API_URL}links/`;
  constructor(private http: HttpClient) {
      this.http = http;
  }
    getLinkById(param) {
        return this.http.get<any>(`${this.apiuri}${param}`);
    }
}
