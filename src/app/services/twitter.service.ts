import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Api} from '../entities/api';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {

    private apiuri = `${Api.API_URL}security/auth/twitter`;

    constructor(private http: HttpClient) { }

    getAuthUrl() {
        return this.http.get<any>(`${this.apiuri}/url`);
    }

    signIn(token: string | null) {
        return this.http.get<any>(`${this.apiuri}/register?oauth_verifier=${token}`);
    }
}
