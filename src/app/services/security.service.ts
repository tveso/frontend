import { Injectable } from '@angular/core';
import {Api} from '../entities/api';
import {User} from '../entities/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject, Subscriber} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
    rolesHyperarchy = {
            'ROLE_ADMIN': 'ROLE_USER',
            'ROLE_USER': null,
            'ROLE_SUPERADMIN': 'ROLE_ADMIN'
        };
    headers = {
        'Access-Control-Allow-Credentials': 'true',
        'Non-Cachable': 'true'
    };
    httpOptions = {
        withCredentials: true,
        headers: new HttpHeaders(this.headers)
    };
    public user = null;
    public _user = new Subject<boolean>();
    private apiuri = `${Api.API_URL}security/`;
    constructor(private http: HttpClient, private cookieService: CookieService) {
        this._user.next(this.user);
        this._user.asObservable().subscribe((a) => {
            this.user = a;
        });
    }

    login(user: User) {
        return this.http.post<any[]>(`${this.apiuri}login`, user, this.httpOptions);
    }
    checkAuth() {
        const sessionId = this.cookieService.get('PHPSESSID');
        if (sessionId !== '') {
            this.user = JSON.parse(localStorage.getItem('user'));
        }
        this.http.get<any[]>(`${this.apiuri}islogged`, this.httpOptions).subscribe((data: any) => {
            this.user = data.user;
            localStorage.setItem('user', JSON.stringify(data.user));
            this._user.next(this.user);
        });
        return this.isLogged();
    }
    public isLogged() {
        return this._user.asObservable();
    }

    loggedIn() {
        return this.user !== null && this.user !== 'null' && this.user !== false;
    }
    getUserRoles() {
        if (typeof this.user === 'undefined' || this.user === null) {
            return [];
        }
        return (this.user.roles instanceof Array) ? this.user.roles : [];
    }
    hasAccess(role) {
        if (!(role in this.rolesHyperarchy)) {
            return false;
        }
        const userRoles = this.getUserRoles();
        if (userRoles.length === 0 ) {
            return false;
        }
        if (typeof this.rolesHyperarchy[role] === 'undefined') {
            return true;
        }
        const rolesAvailables = this.getChildrenRoles(role);
        let result = false;
        userRoles.forEach((a) => {
            if (rolesAvailables.indexOf(a) !== -1) {
                result = true;
                return;
            }
        });
        return result;
    }

    private getChildrenRoles(role: any) {
        const result = [role];
        let actualRol = role;
        while (true) {
            actualRol = this.rolesHyperarchy[actualRol];
            if (actualRol === null) {
                break;
            }
            result.push(actualRol);
        }
        return result;
    }
}
