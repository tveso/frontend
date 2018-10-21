import {Injectable} from '@angular/core';
import {Api} from '../entities/api';
import {User} from '../entities/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subject} from 'rxjs';
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
        return this.http.post<any>(`${this.apiuri}login`, user, this.httpOptions);
    }
    checkAuth() {
        return this.http.get<any[]>(`${this.apiuri}islogged`, this.httpOptions);
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
        const userRoles = this.getUserRoles();
        if (userRoles.length === 0 ) {
            return false;
        }
        if (typeof this.rolesHyperarchy[role] === 'undefined') {
            return true;
        }
        const rolesAvailables = this.getChildrenRoles(userRoles);
        let result = false;
        rolesAvailables.forEach((a) => {
            if (role === a) {
                result = true;
                return;
            }
        });

        return result;
    }

    googleLogin(param) {
        return this.http.post<any>(`${this.apiuri}auth/google`, param, this.httpOptions);
    }

    logout() {
        return this.http.get<any>(`${this.apiuri}logout`, this.httpOptions);
    }

    register(model: User) {
        return this.http.post<any>(`${this.apiuri}register`, model, this.httpOptions);
    }

    private getChildrenRoles(role: any) {
        const result = [].concat(role);
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
